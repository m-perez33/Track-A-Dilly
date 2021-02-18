import React from 'react' 
import pencil from './pencil.png';
//import { ImageData } from './ImageData.js'


class UncontrolledInput extends React.Component {
 	constructor(props) {
    super(props)
   this.state = {
    html: this.props.category,
    readOnly: true,
    button: <img src={pencil} height="15px"  alt="logo"/> ,
    entryChange:this.props.asset

  }

}

 handleChange = event => {

     //this.props.handleChange()
    //takes input into array
    let input=event.target.value
    this.setState
    ({entryChange: input});


     //this.props.handleChange(input)

  }


editInput=()=>{
  //toggles between input text and linked text
  if(this.state.readOnly){
    this.setState(
      {readOnly: false,
       button: "Save"
      })
  }else{
    this.props.update(this.state.entryChange)
    this.setState(
      {readOnly: true,
       button:  <img src={pencil} height="15px"  alt="logo"/> 
      })
  }

     //this.props.updateNeeded(this.state.entryChange)


}
handleKeyPress = (event)=>{

  if(event.key==="Enter"){
    this.editInput()
  }
}





  render (){
    console.log(this.state.entryChange)
    return (
            <div>
              


             <span> {this.props.header}<span>&nbsp;</span>
           
                {!this.state.readOnly&&
                    <span>

                    <input 
                      className = "h1 w-20 black f6"
                      onChange={this.handleChange} 
                      value={this.state.entryChange}
                      readOnly={this.state.readOnly}
                      onKeyPress={this.handleKeyPress}
                      />
                    </span>
          
                    }

                {this.state.readOnly&& 
                    <span className="h1 black w-10 bg-white pa1 f6 ">
                   
                            {this.state.entryChange}
                                
                           
                    </span>}
          
                        {'        '}



               <button
                className="f6 pb3.8 mt0.8 b--transparent dim black  pointer "
                onClick={this.editInput}>{this.state.button}
               </button>

               </span>

              
    	</div>
        
  )};
};

export default UncontrolledInput