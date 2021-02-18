import React from 'react';
import ProgressBarComponent from './ProgressBarComponent.js'
import { productList } from './App.js'
import styled, { css, keyframes } from 'styled-components'


 const grow= keyframes `

 0% {
    width: 0%;
  }

  100% {

  }
`;


// Here we create a component that will rotate everything we pass in over two seconds
const Rotate = styled.div`
 background: #1da598;
  height: 100%;
  border-radius: inherit;
  animation-name: ${grow};
  animation-duration: 2s;
  animation-iteration-count: 1;
  transition: width 2s ease in;
`;


`

const FadeInButton = styled.button`
  animation: 1s ${fadeIn} ease-out;
`