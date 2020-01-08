import React from 'react';

const ReadOnlyDataViewer = ({ cell }) => {

   return (
      <div onMouseDown={event => event.stopPropagation()} onMouseOver={event => event.stopPropagation()} >
         {cell.value}
      </div>)
}

export default ReadOnlyDataViewer;
