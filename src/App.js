import React from 'react';
import ProjectBar from './ProjectBar.js'
import './App.scss';
import Signin from './Signin.js';
import Register from './Register.js';
import Navigation from './Navigation.js';



export const projectNameList = [];


class ParentComponent extends React.Component {
  //define initial states needed for app
  constructor(props) {
    super(props);
    this.state = {
      projects: [],
      projectName: "",
      assetCompleted: 0,
      assetPercentage: 0,
      expiration: "",
      count: 1,
      isHidden: true,
      percentage: 0,
      percentStart: 0,
      assetInitial: "",
      updatedDate: "",
      startDate: new Date().getTime(),
      route: 'signin',
      isSignedIn: false,
      assetColor: "",
      dueDateColor: ""
    };
  }


  clearProjects = () => {
    //clears local project state after added to database
    this.setState({
      projectName: "",
      assetInitial: "",
      expiration: ""
    })
  }

  clearUser = () => {
    //Clears user -check usage
    this.setState({
      user: [],
      projects: []
    })
  }

  loadUserProjects = (data) => {
    //Load project data
    this.setState({
      projects: data
    })
  }

  loadUser = (data) => {
    //load user data on login
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        joined: data.joined,
        //entries: data.entries,
      }
    })
  }


  handleChange = (event) => {
    //Sets project name on input change for new project
    this.setState({ projectName: event.target.value });
  }

  handleChange3 = (event) => {
    //Sets initial values for goal number in new project 
    this.setState({
      assetInitial: parseInt(event.target.value),
      //no other usage test without it
      //assetInitialUpdate: parseInt(event.target.value),
      assetPercentage: 0,
    })

  }

  handleChange2 = (event) => {
    //calculates numbers for percentages and start dates
    let date = event.target.value;
    let formatDate = date[5] + date[6] + `/` + date[8] + date[9] + `/` + date[0] + date[1] + date[2] + date[3];
    let newFormatDate = new Date(date[5] + date[6] + `/` + date[8] + date[9] + `/` + date[0] + date[1] + date[2] + date[3]);
    let startTime = new Date();
    let formatStartTime = startTime.getMonth() + 1 + `/` + startTime.getDate() + `/` + startTime.getFullYear();
    let expiredtime = newFormatDate.getTime();

    //for initial state.percentage value can set to zero, but leaving in calculations currently, may remove later
    let startDate = new Date().getTime();//is start date necessary? already assigned in state
    let currenttime = new Date().getTime();
    let diff = expiredtime - startDate;
    let currentDiff = currenttime - startDate;
    let daysuntil = diff / 1000 / 60 / 60 / 24;
    let currentday = currentDiff / 1000 / 60 / 60 / 24;
    let newPercent = (currentday / daysuntil) * 100

    this.setState({
      //comment for new set state
      percentage: Math.round(newPercent),
      expiration: date,
      formatDate: formatDate,
      startDate: startDate,
      inputDate: expiredtime,
      formatStartTime: formatStartTime

    })

  }

  handleKeyPress = (event) => {
    //adds new project info to database from navbar inputs
    if (event.key === "Enter"
      && this.state.startDate < this.state.inputDate
      && Number.isInteger(this.state.assetInitial)
      && this.state.assetInitial > 0) {

      fetch('https://polar-shore-33711.herokuapp.com/addproject', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: this.state.user.email,
          assetInitial: this.state.assetInitial,
          assetCurrent: this.state.assetInitial,
          projectName: this.state.projectName,
          date: this.state.formatDate,
          percentage: this.state.percentage,
          assetPercentage: this.state.assetPercentage,
          assetCompleted: this.state.assetCompleted,
          startDate: this.state.startDate,
          updatedDate: this.state.formatDate,
          formatStartTime: this.state.formatStartTime,
          percentStart: this.state.percentStart
        })
      })
        .then(response => response.json())
        .then(user => {
          fetch('https://polar-shore-33711.herokuapp.com/loadprojects', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              email: this.state.user.email
            })
          })
            //console.log(user)
            .then(response => response.json())
            .then(projects => {

              this.setState({
                projects: projects
              })
              projects.forEach((val) => {
                //sets color change for hitting 100 percent on assets or 0 percent on time                                       
                val.percentage < 100 ? this.setState({ assetColor: "green", })
                  : this.setState({ assetColor: "red", })
                val.assetpercentage < 100 ? this.setState({ dueDateColor: "green", })
                  : this.setState({ dueDateColor: "red", })

              });
            });
        });


      this.clearProjects();


    } else if (event.key === "Enter" && this.state.startDate > this.state.inputDate) {
      alert("Due date must occur in the future")
    } else if (event.key === "Enter") {
      alert("Forgot to add assets")
    }
  }

  onRouteChange = (route) => {

    if (route === 'signout') {
      this.setState({
        isSignedIn: false,
      })
    } else if (route === 'home') {
      this.setState({ isSignedIn: true })
    }

    this.setState({
      route: route,
      projectName: "",
      expiration: "",
      assetInitial: ""
    })
  }

  /*loadColor = (color) => {

    this.setState({
      assetColor: color
    })

  }

  loadColor2 = (color) => {

    this.setState({
      dueDateColor: color
    })

  }*/

  render() {
    console.log(this.state.user)
    console.log(this.state.projects)
    return (

      <div className="center">

        {this.state.route === 'home'
          /* if home route display nav bar */
          ?
          <nav>
            <div className="pl3 mt3">
              <div className='f6 black'>{"Hello " + this.state.user.name.charAt(0).toUpperCase() + this.state.user.name.slice(1) + "!"}</div>

              <div className='f7 black  pa2'>Track-A-Dilly</div>


            </div>
            <div className="containerflex mt3">
              <div className=" f7 black pt3 mt3">Add a Project to Track:{"\u00a0"}{"\u00a0"}{"\u00a0"}</div>

              <div className="measure">
                <label htmlFor="name" className="f7 db tl">Project Name </label>
                <input
                  id="name"
                  className="input-reset ba b--black-20 mb2 db w-100 inputentry"
                  type="text"
                  aria-describedby="name-desc"
                  value={this.state.projectName}
                  onChange={this.handleChange}
                  onKeyPress={this.handleKeyPress} />
              </div>

              <div className="measure">
                <label htmlFor="name" className="f7 db tl">Target Goal#</label>
                <input
                  id="name2"
                  className="input-reset ba b--black-20  mb2 db w-100 inputentry"
                  type="text" required
                  aria-describedby="name-desc"
                  value={this.state.assetInitial}
                  onChange={this.handleChange3}
                  onKeyPress={this.handleKeyPress} />
              </div>

              <div className="measure">
                <label htmlFor="name" className="f7 db tl">Due Date </label>
                <input
                  id="name3"
                  className="input-reset ba b--black-20   db w-100 inputentrydate"
                  type="date" required
                  aria-describedby="name-desc"
                  value={this.state.expiration}
                  onChange={this.handleChange2}
                  onKeyPress={this.handleKeyPress} />
              </div>
            </div>

            <Navigation
              isSignedIn={this.state.isSignedIn}
              onRouteChange={this.onRouteChange} />
          </nav> :

          <div></div>

        }

        {this.state.route === 'home'
          /* if home route display projects if there are any */
          ?
          <div className="container">
            <div>
              <div className="mt4 mb4">

                {
                  this.state.projects.map((val) => (



                    <ProjectBar
                      loadUser={this.loadUser}
                      loadUserRegister={this.loadUserRegister}
                      loadUserProjects={this.loadUserProjects}
                      userid={this.state.user.id}
                      user={this.state.user}
                      projects={this.state.projects}
                      id={val.id}
                      projectName={val.projectname}
                      date={val.date}
                      updatedDate={val.updateddate}
                      percentage={val.percentage}
                      assetCompleted={val.assetcompleted}
                      assetPercentage={val.assetpercentage}
                      assetInitial={val.assetinitial}
                      assetCurrent={val.assetcurrent}
                      email={val.email}
                      assetColor={val.assetpercentage < 100 ? "#1da598" : "#56cc6f"}
                      dueDateColor={val.percentage < 100 ? "#b1c0c6" : "#d12e41"}
                      percentStart={val.percentstart}
                      startDate={val.startdate}
                      formatStartTime={val.formatstarttime}
                      keyid={val.key}
                      key={val.key}
                    />
                  )
                  )
                }
              </div>
            </div>
          </div>

          :

          (this.state.route === 'signin' || this.state.route === 'signout'
            /* otherwise display sigin in or register */
            ?
            <div className="pt5">

              <Signin
                /* data to send for signin component*/
                loadUser={this.loadUser}
                loadUserProjects={this.loadUserProjects}
                onRouteChange={this.onRouteChange}
                /*clearUser={this.clearUser}not sure if needed*/
                handleChangeDate={this.handleChangeDate}
               /* loadColor={this.loadColor}not sure if needed*/
               /* loadColor2={this.loadColor2}not sure if needed */ />

            </div>
            :
            <div className="pt5">
              <Register
              /* data to send for register component*/
                loadUser={this.loadUser}
                onRouteChange={this.onRouteChange}
                clearUser={this.clearUser}
                loadUserProjects={this.loadUserProjects} />
            </div>
          )
        }
      </div>
    );
  }
}


export default ParentComponent;

