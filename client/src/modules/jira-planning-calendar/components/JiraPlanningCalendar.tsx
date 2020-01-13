import React, { useEffect } from 'react';
import Spreadsheet from "react-spreadsheet";
import { fetchDataAction, reorderAction, moveAction, unselectAllAction, singleDestinationMultiDragAndDropAction } from '../actions';
import { useSelector, useDispatch } from 'react-redux';
import JiraPlanningCalendarFilter from './JiraPlanningCalendarFilter';
import { DragDropContext } from 'react-beautiful-dnd';
import { hideElements } from '../../shared/dom-element-helper';
import { Query } from '../data-service';
import LoadingOverlay from 'react-loading-overlay';
import BounceLoader from 'react-spinners/BounceLoader'
import { reorder, move } from '../../shared/drag-and-drop-utils';
import { State } from './../state';
import { MultiDragItem } from './../model/cell/multi-drag-item';
import { Cell } from '../model/cell/cell';

const JiraPlanningCalendar = () => {
  const state = useSelector((state: State) => state);

  const dispatch = useDispatch();

  const filterHandler = async (data) => {
    const query: Query = {
      userName: data.user,
      issue: data.issue,
      startDate: new Date(data.startDate),
      endDate: new Date(data.endDate)
    }

    dispatch(fetchDataAction(query));
  }

  useEffect(() => {
    if (!state.isLoading) {
      hideElements(document.querySelectorAll('.FloatingRect'));
    }

    document.body.addEventListener('mousedown', () => {
      hideElements(document.querySelectorAll('.ActiveCell'))

    }, true);
  }, [state.isLoading])

  useEffect(() => {
    dispatch(fetchDataAction());
  }, []);

  const getList = (row: number, col: number) => {
    return state.data[row][col].value;
  }

  const onDragStart = (result: any) => {
    console.log(result)
    if (!state.multiDragItems.find(x => x.draggableId === result.draggableId)) {
     dispatch(unselectAllAction());
    }
  }

  const onDragEnd = (result: any) => {
    const { source, destination } = result;

    if (!destination) {
      return;
    }

    if (state.multiDragItems.length > 0) {
      handleMultiDrag(source, destination);
    } else {
      handleSimpleDrag(source, destination);
    }
  }

  const handleSimpleDrag = (source, destination) => {
    if (source.droppableId === destination.droppableId) {
      const cellPosition = JSON.parse(source.droppableId);
      const row = cellPosition.row;
      const col = cellPosition.col;
      const result = reorder(getList(row, col), source.index, destination.index);

      dispatch(reorderAction(row, col, result));
    } else {
      const sourceCellPosition = JSON.parse(source.droppableId);
      const destinationCellPosition = JSON.parse(destination.droppableId);
      const sourceRow = sourceCellPosition.row;
      const sourceCol = sourceCellPosition.col;
      const destinationRow = destinationCellPosition.row;
      const destinationCol = destinationCellPosition.col;
      const result = move(getList(sourceRow, sourceCol), getList(destinationRow, destinationCol), source, destination);

      dispatch(moveAction(sourceRow, sourceCol, result[source.droppableId], destinationRow, destinationCol, result[destination.droppableId]));
    }
  }

  const handleMultiDrag = (source, destination) => {
    const sourceCellPosition = JSON.parse(source.droppableId);
      const destinationCellPosition = JSON.parse(destination.droppableId);
      const sourceRow = sourceCellPosition.row;
      const sourceCol = sourceCellPosition.col;
      const destinationRow = destinationCellPosition.row;
      const destinationCol = destinationCellPosition.col;

    dispatch(singleDestinationMultiDragAndDropAction(sourceRow, sourceCol, destinationRow, destinationCol));
  }

  const getContainerStyle = () => ({
    paddingTop: '1%',
    paddingBottom: '1%',
    paddingLeft: '1.5%',
    paddingRight: '1.5%',
    backgroundColor: 'white',
  } as React.CSSProperties)

  const getCalendarContainerStyle = () => ({
    marginTop: '1%'
  } as React.CSSProperties)

  const getSpreadSheetStyle = () => ({
    '.Spreadsheet td': {
      whiteSpace: 'pre'
    }
  } as React.CSSProperties)

  return (
    <div style={getContainerStyle()}>
      <div>
        <JiraPlanningCalendarFilter
          filterHandler={filterHandler}
        />
      </div>
      <LoadingOverlay
        active={state.isLoading}
        spinner={<BounceLoader color='#0052CC' />}
        styles={{
          overlay: (base) => ({
            ...base,
            background: '#D9FFFFFF'
          }),
        }}>
        <div style={getCalendarContainerStyle()}>
          <DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
            <Spreadsheet style={getSpreadSheetStyle()} data={state.data} />
          </DragDropContext>
        </div>
      </LoadingOverlay>
    </div>
  );
}

export default JiraPlanningCalendar;