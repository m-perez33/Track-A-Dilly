import React from 'react';


//component for top right nav. signing/signout route changes

const Navigation =({onRouteChange, isSignedIn, userName})=>{
        
    if(isSignedIn){
      return(




          <p onClick={() => onRouteChange('signout')} className=' link dim f6 black underline pa3 pointer'>Sign Out</p>
        );
      }else{
        return(
        <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
          <p onClick={() => onRouteChange('signin')} className='link dim f6 dark-blue underline pa3 pointer'>Sign In</p>
          <p onClick={() => onRouteChange('register')} className='link dim f6 dark-blue underline pa3 pointer'>Register</p>
        </nav>
        );
      }
}

export default Navigation;