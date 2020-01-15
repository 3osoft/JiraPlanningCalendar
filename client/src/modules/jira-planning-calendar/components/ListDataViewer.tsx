import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import DragHandlerIcon from '@atlaskit/icon/glyph/drag-handler';
import OpenIcon from '@atlaskit/icon/glyph/open';
import { IssuePart } from './../domain/issue/issue-part';
import { CellType } from '../model/cell/cell-type';

const ListDataViewer = ({ cell }) => {

   const row = cell.row;
   const col = cell.col;
   const droppableId = JSON.stringify({ row, col });

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

   const handleOpenIssue = (issueUrl: string) => {
      console.log(issueUrl)
      window.open(issueUrl, '_blank');
   }

   const isDraggable = (cellType: CellType): boolean => {
      return cellType === CellType.DRAGGABLE || cellType === CellType.DRAG_AND_DROP;
   }

   const isDroppable = (cellType: CellType): boolean => {
      return cellType === CellType.DROPPABLE || cellType === CellType.DRAG_AND_DROP;
   }

   return (
      <Droppable droppableId={droppableId} isDropDisabled={!isDroppable(cell.cellType)}>
         {(provided, snapshot) => (
            <div
               ref={provided.innerRef}
               style={getListStyle(snapshot.isDraggingOver)}>
               {cell.value.map((item: IssuePart, index: number) => (
                  <Draggable
                     key={item.id}
                     draggableId={item.id}
                     index={index}
                     isDragDisabled={!isDraggable(cell.cellType)}>
                     {(provided, snapshot) => (
                        <div
                           ref={provided.innerRef}
                           {...provided.draggableProps}

                           style={getListItemStyle(
                              snapshot.isDragging,
                              provided.draggableProps.style                              
                           )}>
                           <div {...provided.dragHandleProps}
                              style={getListItemIconStyle()}
                                                         >
                              <DragHandlerIcon label='drag-handle' />
                           </div>

                           <div style={getListItemTextStyle()}>
                              {item.issue.key}
                           </div>

                           <div onClick={() => handleOpenIssue(item.issue.url)} style={getListItemOpenIconStyle()}>
                              <OpenIcon label='open' />
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