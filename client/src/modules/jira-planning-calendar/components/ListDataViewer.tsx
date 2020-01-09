import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import DragHandlerIcon from '@atlaskit/icon/glyph/drag-handler';
import OpenIcon from '@atlaskit/icon/glyph/open';
import { hideElements } from '../../shared/elements';
import { JIRA_BROWSE_URL } from '../../../jira';

const ListDataViewer = ({ cell }) => {
   const row = cell.row;
   const col = cell.col;
   const id = JSON.stringify({ row, col });

   const getListItemStyle = (isDragging, draggableStyle) => ({
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

   const getListItemIconStyle = () => ({
      width: '20px',
      height: '20px'
   } as React.CSSProperties)

   const getListItemOpenIconStyle = () => ({
      width: '20px',
      height: '20px',
      cursor: 'pointer'
   } as React.CSSProperties)

   const getListItemTextStyle = () => ({
      marginLeft: '5px',
      marginRight: '10px'

   } as React.CSSProperties)

   const handleDragAndDrop = (event) => {
      event.preventDefault();
      event.stopPropagation();
      event.nativeEvent.stopImmediatePropagation();   
   }

   const handleOpenIssue = (item) => {
      window.open(`${JIRA_BROWSE_URL}${item}`, '_blank');
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
                           onMouseDown={event => handleDragAndDrop(event)}
                           onMouseUp={event => handleDragAndDrop(event)}
                           onMouseOver={event => handleDragAndDrop(event)}
                           onMouseMove={event => handleDragAndDrop(event)}
                           ref={provided.innerRef}
                           {...provided.draggableProps}

                           style={getListItemStyle(
                              snapshot.isDragging,
                              provided.draggableProps.style
                           )}>
                           <div {...provided.dragHandleProps} style={getListItemIconStyle()}>
                              <DragHandlerIcon label='drag-handle' />
                           </div>

                           <div style={getListItemTextStyle()}>
                              {item}
                           </div>

                           <div onClick={() => handleOpenIssue(item)} style={getListItemOpenIconStyle()}>
                              <OpenIcon label='open-icon' />
                           </div>
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