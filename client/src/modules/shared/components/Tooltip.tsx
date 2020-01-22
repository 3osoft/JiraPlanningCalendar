import React from 'react';
import WarningIcon from '@atlaskit/icon/glyph/warning';
import './Tooltip.css';

const Tooltip = (props) => {

   const primaryColor = () => {
      return hasWarnings() ? '#FF991F' : 'transparent';
   }

   const secondaryColor = () => {
      return hasWarnings() ? '#FFFAE5' : 'transparent';
   }

   const hasWarnings = () => {
      return props.items.length > 0;
   }

   return (
      <div className='tooltip'>
         <WarningIcon label='warning-icon' primaryColor={primaryColor()} secondaryColor={secondaryColor()} size='medium' />
         <div className='tooltipText'>
            <ul>
               {props.items.map((item: string) => {
                  return <li>{item}</li>
               })}
            </ul>
         </div>
      </div>
   )
}

export default Tooltip;