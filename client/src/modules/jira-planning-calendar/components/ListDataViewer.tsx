import React from 'react';
import { Droppable, Draggable, DraggableStateSnapshot } from 'react-beautiful-dnd';
import DragHandlerIcon from '@atlaskit/icon/glyph/drag-handler';
import OpenIcon from '@atlaskit/icon/glyph/open';
import { JIRA_BROWSE_URL } from '../../../jira';
import { useSelector, useDispatch } from 'react-redux';
import { selectAction } from './../actions';
import { MultiDragItem } from '../model/cell/multi-drag-item';
import { State } from '../state';

const ListDataViewer = ({ cell }) => {
   const dispatch = useDispatch();
   const state = useSelector((state: State) => state);

   const row = cell.row;
   const col = cell.col;
   const droppableId = JSON.stringify({ row, col });
   const cellId = cell.id;

   const getListItemStyle = (isDragging, draggableStyle, isSelected) => ({
      display: 'flex',
      userSelect: 'none',
      padding: '3px',
      marginTop: '2px',
      marginBottom: '2px',
      background: isDragging ? 'lightgreen' : 'white',
      borderStyle: isSelected ? 'dotted' : 'none',

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

   const handleOpenIssue = (item) => {
      window.open(`${JIRA_BROWSE_URL}${item}`, '_blank');
   }

   const handleClickForMultiDrag = (event: MouseEvent, item: string) => {
      if (event.defaultPrevented) {
         return;
      }

      if (event.button !== 0) {
         return;
      }

      event.preventDefault();

      const multiDragItem = {
         cellId: cellId,
         draggableId: `${cellId}-${item}`,
         value: item
      } as MultiDragItem;

      toggleSelection(multiDragItem);
   }

   const toggleSelection = (item: MultiDragItem) => {
      if (!isSelected(item)) {
         dispatch(selectAction(item));
      }
   }

   const isSelected = (item: MultiDragItem): boolean => {
      return state.multiDragItems.find(x => x.draggableId === item.draggableId);
   }

   return (
      <Droppable droppableId={droppableId}>
         {(provided, snapshot) => (
            <div
               ref={provided.innerRef}
               style={getListStyle(snapshot.isDraggingOver)}>
               {cell.value.map((item, index) => (
                  <Draggable
                     key={`${cellId}-${item}`}
                     draggableId={`${cellId}-${item}`}
                     index={index}>
                     {(provided, snapshot) => (
                        <div
                           ref={provided.innerRef}
                           {...provided.draggableProps}

                           style={getListItemStyle(
                              snapshot.isDragging,
                              provided.draggableProps.style,
                              isSelected({cellId: cellId, draggableId: `${cellId}-${item}`, value: item})
                           )}>
                           <div {...provided.dragHandleProps}
                              style={getListItemIconStyle()}
                              onClick={(event: MouseEvent) => handleClickForMultiDrag(event, item)}
                           >
                              <DragHandlerIcon label='drag-handle' />
                           </div>

                           <div style={getListItemTextStyle()}>
                              {item}
                           </div>

                           <div onClick={() => handleOpenIssue(item)} style={getListItemOpenIconStyle()}>
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