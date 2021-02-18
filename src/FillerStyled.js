import styled, { keyframes } from 'styled-components'

    


   const fill = keyframes`
      0% {
       width: ${props=>props.percentstart}%;
      }

      100% {
     }
     `

     const FillerStyled = styled.div`
        width: ${props=>props.percent}%;
        background: ${props=>props.color};
        height: 100%;
        border-radius: inherit;
        animation-name: ${fill};
        animation-duration: 12s;
        animation-iteration-count: 1;
        transition: width 2s ease-in-out;
    `


export default FillerStyled;