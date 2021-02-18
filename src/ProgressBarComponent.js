import React from 'react';
import Filler from './Filler.js'
import './App.scss';


const ProgressBarComponent =(props)=>{


  return (

    <div className="pbcomponent">

      <div className="progress-bar">
        <Filler       
          keys={props.keys}
          percent={props.percentage} 
          percentstart={props.percentStart} 
          color={props.color}
        />
      </div>
      <div className="f6 black pt2 mr5 ml3">{props.info}</div>

    </div>
  );
};


export default ProgressBarComponent