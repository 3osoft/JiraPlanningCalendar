import React from 'react';
import WarningIcon from '@atlaskit/icon/glyph/warning';
import './Tooltip.css';

const Tooltip = (props) => {
   
   return (
      <div className={ props.items.length > 0 ? 'tooltip' : 'hiddenTooltip'}>
         <WarningIcon label='warning-icon' primaryColor='#FF991F' secondaryColor='#FFFAE5' size='medium'/>
         <div className='tooltipText'>
            {props.items}
         </div>
      </div>
   )
}

export default Tooltip;