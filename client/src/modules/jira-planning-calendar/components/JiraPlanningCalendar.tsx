import React, { useEffect } from 'react';
import Spreadsheet from "react-spreadsheet";
import { fetchDataAction, reorderAction, moveAction } from '../actions';
import { useSelector, useDispatch } from 'react-redux';
import JiraPlanningCalendarFilter from './JiraPlanningCalendarFilter';
import { DragDropContext } from 'react-beautiful-dnd';
import { hideElements } from '../../shared/dom-element-helper';
import { Query } from '../data-service';
import LoadingOverlay from 'react-loading-overlay';
import BounceLoader from 'react-spinners/BounceLoader'

const JiraPlanningCalendar = () => {
  const state = useSelector(state => state);

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

  const reorder = (list: Array<any>, startIndex: number, endIndex: number) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  }

  const move = (source: Array<any>, destination: Array<any>, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(droppableDestination.index, 0, removed);

    const result = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;

    return result;
  }

  const getList = (row: number, col: number) => {
    return state.data[row][col].value;
  }

  const onDragEnd = (result: any) => {
    const { source, destination } = result;

    if (!destination) {
      return;
    }

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

  const getContainerStyle = () => ({
    paddingTop: '1%',
    paddingBottom: '1%',
    paddingLeft: '1.5%',
    paddingRight: '1.5%',
    backgroundColor: 'white',
  } as React.CSSProperties)

  const getCalendarContainerStyle = () => ({
    height: '600px',
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
          <DragDropContext onDragEnd={onDragEnd}>
            <Spreadsheet style={getSpreadSheetStyle} data={state.data} />
          </DragDropContext>
        </div>
      </LoadingOverlay>
    </div>
  );
}

export default JiraPlanningCalendar;