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
import { State } from './../state';
import { Position } from '../../shared/position';

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

  const getList = (position: Position) => {
    return state.data[position.row][position.col].value;
  }

  const onDragEnd = (result: any) => {
    const { source, destination } = result;

    if (!destination) {
      return;
    }

    handleDragAndDrop(source, destination);
  }

  const handleDragAndDrop = (source, destination) => {
    if (source.droppableId === destination.droppableId) {
      const cellPos = JSON.parse(source.droppableId);
      const positon = {
        row: cellPos.row,
        col: cellPos.col
      } as Position;

      dispatch(
        reorderAction(positon, source.index, destination.index, getList(positon))
      );
    } else {
      const sourCellPos = JSON.parse(source.droppableId);
      const destCellPos = JSON.parse(destination.droppableId);

      const sourcePosition = {
        row: sourCellPos.row,
        col: sourCellPos.col
      } as Position;

      const destinationPosition = {
        row: destCellPos.row,
        col: destCellPos.col
      } as Position;

      dispatch(
        moveAction(sourcePosition, destinationPosition, getList(sourcePosition), getList(destinationPosition), source, destination)
      );
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
            <Spreadsheet style={getSpreadSheetStyle()} data={state.data} />
          </DragDropContext>
        </div>
      </LoadingOverlay>
    </div>
  );
}

export default JiraPlanningCalendar;