import React from 'react';
import './LoadingComponents.css';

const LoadingComponent = () => {
   return (
      <div className='lds-roller'>
         <div></div>
         <div></div>
         <div></div>
         <div></div>
         <div></div>
         <div></div>
         <div></div>
         <div></div>
      </div>
   )
}

export default LoadingComponent;