import React, { useEffect, useRef }  from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import DragHandlerIcon from '@atlaskit/icon/glyph/drag-handler';
import { hideElements } from '../../shared/events';

const ListDataViewer = ({ cell }) => {
   const row = cell.row;
   const col = cell.col;
   const id = JSON.stringify({ row, col });

   const getItemStyle = (isDragging, draggableStyle) => ({
      display: 'flex',
      userSelect: 'none',
      padding: '3px',
      marginTop: '2px',
      marginBottom: '2px',
      background: isDragging ? 'lightgreen' : 'white',

      ...draggableStyle
   } as React.CSSProperties);

   const getListStyle = isDraggingOver => ({
      background: isDraggingOver ? 'lightblue' : 'white',
      padding: '8px',
   } as React.CSSProperties);

   const getDragHandleStyle = () => ({
      width: '20px',
      height: '20px'
   } as React.CSSProperties)

   const handleEventPropagation = (event) => {
      event.preventDefault();    
      event.stopPropagation();
      event.nativeEvent.stopImmediatePropagation(); 

      if (event.type === 'mousedown') {              
         hideElements(document.querySelectorAll(".ActiveCell"));
      }
   }

   return (
      <Droppable droppableId={id}>
         {(provided, snapshot) => (
            <div
               ref={provided.innerRef}
               style={getListStyle(snapshot.isDraggingOver)}>
               {cell.value.map((item, index) => (
                  <Draggable
                     key={item}
                     draggableId={item}
                     index={index}>
                     {(provided, snapshot) => (
                        <div
                           onMouseDown={event => handleEventPropagation(event)}
                           onMouseUp={event => handleEventPropagation(event)}
                           onMouseOver={event => handleEventPropagation(event)}
                           onMouseMove={event => handleEventPropagation(event)}
                           ref={provided.innerRef}
                           {...provided.draggableProps}

                           style={getItemStyle(
                              snapshot.isDragging,
                              provided.draggableProps.style
                           )}>
                           <div {...provided.dragHandleProps} style={getDragHandleStyle()}>
                              <DragHandlerIcon label='drag-handle' />
                           </div>

                           {item}
                        </div>
                     )}
                  </Draggable>
               ))}
               {provided.placeholder}
            </div>
         )}
      </Droppable>
   )
}

export default ListDataViewer;