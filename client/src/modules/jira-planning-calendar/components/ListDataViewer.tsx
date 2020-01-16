import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import OpenIcon from '@atlaskit/icon/glyph/open';
import { IssuePart } from './../domain/issue/issue-part';
import { CellType } from '../model/cell/cell-type';
import Tooltip from '../../shared/components/Tooltip';

const ListDataViewer = ({ cell }) => {
   const row = cell.row;
   const col = cell.col;
   const droppableId = JSON.stringify({ row, col });

   const getListItemStyle = (isDragging, draggableStyle, color) => ({
      display: 'flex',
      userSelect: 'none',
      padding: '3px',
      background: isDragging ? 'lightgreen' : color,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',

      ...draggableStyle
   } as React.CSSProperties);

   const getListStyle = isDraggingOver => ({
      height: '100%',
      background: isDraggingOver ? 'lightblue' : 'white',
   } as React.CSSProperties);

   const getListItemIconStyle = () => ({
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
                           {...provided.dragHandleProps}

                           style={getListItemStyle(
                              snapshot.isDragging,
                              provided.draggableProps.style,
                              item.color
                           )}>

                           {item.issue.warnings.length > 0 ? <Tooltip items={item.issue.warnings} /> : null}

                           <div style={getListItemTextStyle()}>
                              {item.title}
                           </div>

                           <div onClick={() => handleOpenIssue(item.issue.url)} style={getListItemIconStyle()}>
                              <OpenIcon label='open' size='medium' />
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