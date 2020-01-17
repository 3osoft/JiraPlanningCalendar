import React from 'react';
import { isToday } from '../../shared/date-helper';

const DateViewer = ({ cell }) => {
   const date: Date = cell.value;

   const getStyle = () => ({
      backgroundColor: isToday(date) ? 'lightgrey' : 'white',
      display: 'flex',
      height: '100%',
      width: '100%',
      userSelect: 'none',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center'
   } as React.CSSProperties)

   return (<div style={getStyle()}>
      {date.toLocaleDateString()}
   </div>)
}

export default DateViewer;