import React from 'react';
import './App.scss';
import FillerStyled from './FillerStyled.js'


const Filler=(props)=>{
   console.log(props.color)
      console.log(props.percent)


   // let color=props.color


	return( 
		<FillerStyled
		   color={props.color}
	       percentstart={props.percentstart}
	   	   percent={props.percent}
	   />
	 );
}


export default Filler