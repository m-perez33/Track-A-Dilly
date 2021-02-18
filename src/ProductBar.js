import React from 'react';
import ProgressBarComponent from './ProgressBarComponent.js'
import { productList } from './App.js'


const archive = [];

class ProductBar extends React.Component {
  //full product listing (name, ProgressBarComponent, delete)
  constructor(props) {
    super(props);
    this.state = {
      isHidden: false,
      assetCompleted: 0,
      assetCurrent: 0,
      assetPercentage: 0,
      currentPercent:0,
      count:0,
      assetInitial:this.props.assetInitial ,
      percentStart: this.props.percentStart,
      className:"dateclass placeholderclass",
      percentage: this.props.percentage,
    };
  }

handleChangeDone = (event) => {
  console.log(this.props.user)
//need to loop through projects of current
this.props.user.projects.forEach(val=>{
  if (val.key=== this.props.keyid) {
       let currentPercent=(parseInt(event.target.value)/val.assetCurrent)*100
       this.setState({ 
        assetCompleted: parseInt(event.target.value),
        currentPercent:Math.round(currentPercent), 
      });

    }
  });



}

  percentDone=(event)=>{
  	if(event.key === "Enter"){
      this.setState({percentStart: this.state.currentPercent});
  }
  }

  updateDone= (event) => {
     	if(event.key === "Enter"){
     	 	this.setState((state, props)=>({ 
            assetPercentage: state.currentPercent,
            count: state.count + 1,
          }));    		
       }
//fetch
           fetch('https://polar-shore-33711.herokuapp.com/updatedone', {
              method: 'put',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify({
                id: this.props.userid,
                assetPercentage: this.state.currentPercent,
                assetCompleted: this.state.assetCompleted,
                key: this.props.keyid
              })
            })
              .then(response => response.json())
              .then(user => {
                if (user.id) {
                  this.props.loadUser(user)
                  //this.props.onRouteChange('home');
               }
                //console.log(this.props.user)
              })


}


    	/*productList.forEach(val => {
        if (this.props.product === val.product) {
          	val.assetCompleted = this.state.assetCompleted
          	val.assetPercentage= this.state.currentPercent
          }
    		});*/


    	



  handleChangeNeeded = event => {
    //change "needed" text window/take input and assign to state



    this.props.user.projects.forEach(val=>{
  if (val.key=== this.props.keyid) {
       let currentPercent=(val.assetCompleted/parseInt(event.target.value))*100
      
          this.setState({
           percentStart: this.state.currentPercent,
           currentPercent: Math.round(currentPercent),
           assetCurrent: parseInt(event.target.value),
           assetInitial:0
            });
        }
      });

   



     	/*productList.forEach(val => {
     		//maps through product list to calculate percentage of amount completed
  	  if (this.props.product === val.product) {
            let currentPercent=(val.assetCompleted/parseInt(event.target.value))*100
      
       		this.setState({
       	   percentStart: this.state.currentPercent,
       		 currentPercent: Math.round(currentPercent),
       		 assetCurrent: parseInt(event.target.value),
       		 assetInitial:0
           	});*/
  	



    };

  updateNeeded = (event) => {

      	if(event.key === "Enter"){
     		this.setState({ 
            assetPercentage: this.state.currentPercent,
            count: this.state.count + 1,
          });

      fetch('https://polar-shore-33711.herokuapp.com/updateneeded', {
              method: 'put',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify({
                id: this.props.userid,
                assetPercentage: this.state.currentPercent,
                assetCurrent: this.state.assetCurrent,
                key: this.props.keyid
              })
            })
              .then(response => response.json())
              .then(user => {
                if (user.id) {
                  this.props.loadUser(user)
                  //this.props.onRouteChange('home');
               }
                //console.log(this.props.user)
              })
        //fetch

/*
     		productList.forEach(val => {
          		if (this.props.product === val.product) {
          			val.assetCurrent = this.state.assetCurrent
          			val.assetPercentage= this.state.currentPercent
          		}
          	});
    	   }
*/}






  	};

  handleChangeDate = (event) => {
    //change "needed" text window/take input and assign to state
    //need to kill all updated dates
        this.props.user.projects.forEach(val => {
           
           let date = event.target.value;    
           let expired = new Date(
            date[0] + date[1] + date[2] + date[3],
            date[5] + date[6]-1,
            date[8] + date[9]
          );
          let formatDate=date[5]+date[6]+`/`+date[8] + date[9]+`/`+date[0] + date[1] + date[2] + date[3]


          let newFormatDate= new Date(date[5]+date[6]+`/`+date[8] + date[9]+`/`+date[0] + date[1] + date[2] + date[3])

          let updatedDate = expired.getTime();

          let currenttime = new Date().getTime();

          let expiredtime = newFormatDate.getTime();


          let diff = expiredtime - val.startDate;

          let test = currenttime - val.startDate;

   	      let daysuntil = Math.abs(diff / 1000 / 60 / 60 / 24);

          let updateday = Math.abs(test / 1000 / 60 / 60 / 24);
     		//maps through product list to calculate percentage of amount completed
          let testPercent = (2/daysuntil)*100

  if (this.props.startDate>expiredtime) {
    alert("date has passed yo")
  }else{
     		this.setState({
           updatedDate: expired.getTime(),
           percentage: Math.round(testPercent),
     		});
        //fetch
        fetch('https://polar-shore-33711.herokuapp.com/updatedate', {
              method: 'put',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify({
                id: this.props.userid,
                date: formatDate,

               // updatedDate: formatDate,
                percentage: Math.round(testPercent),
                percentStart: this.props.perecentsatart,
                key: this.props.keyid
              })
            })
              .then(response => response.json())
              .then(user => {
                if (user.id) {
                  this.props.loadUser(user)
                  //this.props.onRouteChange('home');
               }
                //console.log(this.props.user)
              })

        
                console.log(expired.getTime())


    /*if (this.props.product === val.product) {
            val.updatedDate = expired.getTime()
            val.percentage= Math.round(testPercent)
            val.percentStart=this.props.percentStart
            }*/
          }
        });
		}

  removeClass=()=>{
  	this.setState({className: ""})
  }

  /*deleteBar = () => {
    productList.forEach((val, i, arr) => {
      if (this.props.product === val.product) {
        window.confirm(`Would you like to delete ${val.product}?`);
        archive.push(val);
        arr.splice(i, 1);
        this.setState({ isHidden: !this.state.isHidden });
      }
    });
  };*/


  render() {
    //console.log(this.state.updatedDate)
    
    return (
      <div className= "br5 ba b--white-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">

        {!this.state.isHidden && (
        <div>
          <div className="title">
             <h1 className="projectname">{this.props.product} &nbsp;</h1>
              <h2>Start Date:   {this.props.formatStartTime}</h2>
               <span className="delete" onClick={this.deleteBar}>
            x
          </span>
            </div>


          <div className="productname">

            <h2>Needed</h2>{' '}
              <input className="inputsmall"
                type="text"
                placeholder={`${this.props.assetCurrent}`}
                onKeyDown={this.percentDone}
                onKeyUp={this.updateNeeded}
                onChange={this.handleChangeNeeded}
               />
            <br></br>
            <h2>Done</h2>{' '}
            <input 
               className="inputsmall"
               type="text"
               placeholder={`${this.props.assetCompleted}`}
               onKeyDown={this.percentDone}
               onKeyUp={this.updateDone}
               onChange={this.handleChangeDone}
          /><br></br>
            <h2>Due Date{'   '}</h2>
			       <input 
               type="date" 
               placeholder={`${this.props.date}`} 
               onClick={this.removeClass}
               onChange={this.handleChangeDate}
               className={this.state.className}/>
            </div>
          </div>

        )}
        {!this.state.isHidden && (
         <div>
         <ProgressBarComponent
           keys={this.state.count}
           percentage={this.props.assetPercentage}
           count={this.state.count}
           info={`${this.props.assetPercentage}% completed`}
           percentStart={this.state.percentStart}


          />
          <ProgressBarComponent
            keys={this.state.count}
            info={`${this.state.percentage}% time elapsed`}
            percentage={this.state.percentage}    
          />
         </div>
        )}
      </div>
    );
  }
}

export default ProductBar