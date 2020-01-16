import React, { useEffect } from 'react';
import Spreadsheet from "react-spreadsheet";
import { fetchDataAction, reorderAction, moveAction } from '../actions';
import { useSelector, useDispatch } from 'react-redux';
import JiraPlanningCalendarFilter from './JiraPlanningCalendarFilter';
import { DragDropContext, DropResult, DraggableLocation } from 'react-beautiful-dnd';
import { hideElements } from '../../shared/dom-element-helper';
import { Query } from '../data-service';
import LoadingOverlay from 'react-loading-overlay';
import BounceLoader from 'react-spinners/BounceLoader'
import { State } from './../state';
import { Position } from '../../shared/position';
import './JiraPlanningCalendar.css';

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


  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) {
      return;
    }

    handleDragAndDrop(source, destination);
  }

  const handleDragAndDrop = (source: DraggableLocation, destination: DraggableLocation) => {
    if (source.droppableId === destination.droppableId) {
      const cellPos = JSON.parse(source.droppableId);
      const positon = {
        row: cellPos.row,
        col: cellPos.col
      } as Position;

      // dispatch(
      //   reorderAction(positon, source.index, destination.index)
      // );
    } else {
      const sourCellPos = JSON.parse(source.droppableId);
      const destCellPos = JSON.parse(destination.droppableId);

      const issuePart = state.data[sourCellPos.row][sourCellPos.col].value[source.index];

      const sourPos = {
        row: sourCellPos.row,
        col: sourCellPos.col
      } as Position;

      const destPos = {
        row: destCellPos.row,
        col: destCellPos.col
      } as Position;

      dispatch(
        moveAction(issuePart, sourPos, destPos)
      );
    }
  }

  return (
    <div className='container'>
      <div>
        <JiraPlanningCalendarFilter
          filterHandler={filterHandler}
        />
      </div>
      <LoadingOverlay
        active={state.isLoading}
        spinner={<BounceLoader color='#0052CC' />}
        styles={{
          overlay: (base: any) => ({
            ...base,
            background: '#D9FFFFFF'
          }),
        }}>
        <div className='calendar'>
          <DragDropContext onDragEnd={onDragEnd}>
            <Spreadsheet data={state.data} />
          </DragDropContext>
        </div>
      </LoadingOverlay>
    </div>
  );
}

export default JiraPlanningCalendar;