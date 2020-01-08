import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const ListDataViewer = ({ cell }) => {
   const row = cell.row;
   const col = cell.col;
   const id = JSON.stringify({ row, col });

   const getItemStyle = (isDragging, draggableStyle) => ({
      userSelect: 'none',
      padding: 3,
      margin: `0 0 4px 0`,

      background: isDragging ? 'lightgreen' : 'white',

      ...draggableStyle
   });

   const getListStyle = isDraggingOver => ({
      background: isDraggingOver ? 'lightblue' : 'white',
      padding: '8px',
   });

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
                           ref={provided.innerRef}
                           {...provided.draggableProps}
                           {...provided.dragHandleProps}
                           style={getItemStyle(
                              snapshot.isDragging,
                              provided.draggableProps.style
                           )}>
                           {item}
                        </div>
                     )}
                  </Draggable>
               ))}
               {provided.placeholder}
            </div>
         )
         }
      </Droppable >
   )
}

export default ListDataViewer;

{/* <div style={{ listStyleType: 'none' }}>

</div> */}