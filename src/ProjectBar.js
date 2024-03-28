import React from 'react';
import ProgressBarComponent from './ProgressBarComponent.js';
import UncontrolledInput from './UncontrolledInput.js'


class ProjectBar extends React.Component {
  //set state for all information related to dates and asset sizes. changes in 
  //state affect the size and color of the progress bar
  constructor(props) {
    super(props);
    this.state = {
      disable: true,
      val: this.props.assetCompleted,
      isHidden: false,
      assetCompleted: this.props.assetCompleted,
      assetCurrent: this.props.assetCurrent,
      assetPercentage: this.props.assetPercentage,
      count: 0,
      assetInitial: this.props.assetInitial,
      percentStart: this.props.percentStart,
      className: "dateclass placeholderclass",
      percentage: this.props.percentage,
      assetColor: this.props.assetColor,//
      dueDateColor: this.props.dueDateColor
    };
  }

  handleClick = () => {

    this.setState({ disable: !this.state.disable })

  }

  updateDone = (val) => {
    //update value of done assets iin database
    let currentdone = Math.round((parseInt(val) / this.state.assetCurrent) * 100)

    this.setState({ currentPercent: currentdone });
    fetch('https://polar-shore-33711.herokuapp.com/updatedone', {
      method: 'put',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: this.props.id,
        assetPercentage: currentdone,
        assetCompleted: parseInt(val),
        key: this.props.keyid
      })
    })
      .then(response => response.json())
      .then(changes => {

        this.setState({
          assetCompleted: parseInt(val),
          count: this.state.count + 1,
          percentStart: this.state.currentPercent,
        });

        //conditional to ensure filler does not exceeed 100%
        if (parseInt(val) > this.props.assetCurrent) {
          this.setState({ assetPercentage: 100 });
        } else {
          this.setState({ assetPercentage: currentdone });
        }

        if (currentdone < 100) {
          this.setState({ assetColor: "#1da598", });
        } else {
          this.setState({ assetColor: "#56cc6f", });
        }


        this.props.projects[0].assetcompleted = parseInt(val)
        this.props.projects[0].assetpercentage = currentdone

      })

  }




  updateNeeded = (val) => {
    //updates amount of assets needed if it is adjusted after intital setting

    const current = Math.round((this.state.assetCompleted / parseInt(val)) * 100)

    this.setState({ currentPercent: current });
    //Pull data from database.
    fetch('https://polar-shore-33711.herokuapp.com/updateneeded', {
      method: 'put',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: this.props.id,
        assetPercentage: current,
        assetCurrent: parseInt(val),
        key: this.props.keyid
      })
    })
      .then(response => response.json())
      .then(changes => {
        this.setState({
          assetCurrent: parseInt(val),
          count: this.state.count + 1,
          percentStart: this.state.currentPercent,
        });

        //conditional to ensure filler does not exceeed 100%
        //this code could be simplified and turned into another method since it is used in update done
        if (parseInt(val) < this.props.assetCompleted) {
          this.setState({ assetPercentage: 100 });
        } else {
          this.setState({ assetPercentage: current });
        }

        if (current < 100) {
          this.setState({ assetColor: "#1da598", });
        } else {
          this.setState({ assetColor: "#56cc6f", });
        }

        this.props.projects[0].assetcurrent = parseInt(val)
        this.props.projects[0].assetpercentage = this.state.assetPercentage
      })
  }


  handleChangeDate = (event) => {
    //change "needed" text window/take input and assign to state to change date
    //need to kill all updated dates
    //this.props.projects[0].forEach(val => {

    let date = event.target.value;
    let expired = new Date(
      date[0] + date[1] + date[2] + date[3],
      date[5] + date[6] - 1,
      date[8] + date[9]
    );
    let formatDate = date[5] + date[6] + `/` + date[8] + date[9] + `/` + date[0] + date[1] + date[2] + date[3]
    //not sure why i didnt use the variable here, will have to test
    let newFormatDate = new Date(date[5] + date[6] + `/` + date[8] + date[9] + `/` + date[0] + date[1] + date[2] + date[3])

    //let updatedDate = expired.getTime();
    let currenttime = new Date().getTime();
    let expiredtime = newFormatDate.getTime();

    let diff = expiredtime - this.props.startDate;
    let currentDiff = currenttime - this.props.startDate;
    let daysuntil = Math.abs(diff / 1000 / 60 / 60 / 24);
    let updateday = Math.abs(currentDiff / 1000 / 60 / 60 / 24);
    //maps through product list to calculate percentage of amount completed
    let newPercent = Math.round(updateday / daysuntil * 100)

    newPercent = newPercent > 100 ? newPercent = 100 : newPercent

    if (this.props.startDate > expiredtime) {
      alert("Date entered has passed. Please enter a valid date")
    } else {
      this.setState({
        updatedDate: expired.getTime(),
        percentage: Math.round(newPercent),
      });
      //fetch
      fetch('https://polar-shore-33711.herokuapp.com/updatedate', {
        method: 'put',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: this.props.id,
          percentage: newPercent,
          date: formatDate,
          key: this.props.keyid
        })
      })
        .then(response => response.json())
        .then(changes => {
          if (newPercent < 100) {
            this.setState({ dueDateColor: "#b1c0c6", });
          } else {
            this.setState({ dueDateColor: "#d12e41", });
          }
          this.props.projects[0].percentage = newPercent

        })
    }
  }

  removeClass = () => {
    //class swap on due date
    this.setState({ className: "inputentrydate" })
  }

  deleteBar = () => {

    //delet project from database

    if (window.confirm(`Would you like to delete ${this.props.projectName}?`)) {
      fetch('https://polar-shore-33711.herokuapp.com/delete', {
        method: 'delete',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: this.props.id,
          email: this.props.email


        })
      })
        .then(response => response.json())
        .then(projects => {
          this.props.loadUserProjects(projects)
        })
    }
  };


  render() {
    //JSX for home page. 
    return (
      <div>

        {!this.state.isHidden && (
          //when state is hidden, projects not visible
          <div className="containergrid mb4">


            <div className="title pa3">
              <span className="center f6">{this.props.projectName} &nbsp;&nbsp;</span>
              <span className="black f6">Started:   {this.props.formatStartTime}</span>
              <span className="delete" onClick={this.deleteBar}>x</span>
            </div>
            <div className="pinfo br b--white bw1 ">
              <div className="f6 black pt2 pb2 ">
                <span>
                  <UncontrolledInput
                    header={"Goal:"}
                    asset={this.state.assetCurrent}
                    id={this.props.id}
                    type="text"
                    update={this.updateNeeded}
                  />
                </span>
              </div>
              <div className="f6 black pt0 pb2 mt3 ">
                <UncontrolledInput
                  header="Done:"
                  asset={this.state.assetCompleted}
                  id={this.props.id}
                  type="text"
                  update={this.updateDone}
                />
              </div>

              <div className="f6 pt2 pb1 black">Due Date:{' '}</div>
              <input
                type="date"
                placeholder={`${this.props.updatedDate}`}
                onClick={this.removeClass}
                onChange={this.handleChangeDate}
                className={this.state.className} />
            </div>

            <div className=" bar">
              <ProgressBarComponent
                keys={this.state.count}
                percentage={this.state.assetPercentage}
                count={this.state.count}
                info={`${this.state.assetPercentage}% Completed`}
                percentStart={this.state.percentStart}
                color={this.state.assetColor}
              />
              <ProgressBarComponent
                keys={this.state.count}
                info={`${100 - this.state.percentage}% Time Remaining`}
                percentage={this.state.percentage}
                color={this.state.dueDateColor}
              />

            </div>
          </div>
        )}
      </div>
    );
  }
}

export default ProjectBar