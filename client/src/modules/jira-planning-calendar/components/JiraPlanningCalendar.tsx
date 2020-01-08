import React, { useEffect } from 'react';
import Spreadsheet from "react-spreadsheet";
import { fetchDataAction, reorderAction } from '../actions';
import { useSelector, useDispatch } from 'react-redux';
import JiraPlanningCalendarFilter from './JiraPlanningCalendarFilter';
import { DataService } from '../data-service';
import { Query } from '../data-loader';
import ListDataViewer from './ListDataViewer';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const JiraPlanningCalendar = () => {
  const dataService = new DataService();
  const data = useSelector(state => state.data);

  const dispatch = useDispatch();

  const filterHandler = async (data) => {
    const query: Query = {
      userName: data.user,
      issue: data.issue,
      startDate: new Date(data.startDate),
      endDate: new Date(data.endDate)
    }

    const result = await filterData(query);
    dispatch(fetchDataAction(result));
  }

  const loadData = async () => {
    return await dataService.loadData();
  }

  const filterData = async (query) => {
    return await dataService.loadData(query);
  }

  useEffect(() => {
    async function load() {
      // const result = await loadData();
      const result = [
        [{ row: 0, col: 0, value: ['Raspberry', 'Apple'], DataViewer: ListDataViewer }, { row: 0, col: 1, value: ['Paprika', 'Onion'], DataViewer: ListDataViewer }],
        [{ row: 1, col: 0, value: ['Cola', 'Fanta', 'Sprite'], DataViewer: ListDataViewer }]
      ];
      dispatch(fetchDataAction(result));
    }
    load();
  }, []);

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  }

  const move = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(droppableDestination.index, 0, removed);

    const result = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;

    return result;
  }
  
  const getList = (row, col) => {
    return data[row][col].value;
  }

  const onDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) {
      return;
    }

    if (source.droppableId === destination.droppableId) {
      const cellPosition = JSON.parse(source.droppableId);
      const row = cellPosition.row;
      const col = cellPosition.col;

      const items = reorder(getList(row, col), source.index, destination.index);

      dispatch(reorderAction(row, col, items));

    } else {

    }

  }

  const getContainerStyle = () => ({
    paddingTop: '1%',
    paddingBottom: '1%',
    paddingLeft: '1.5%',
    paddingRight: '1.5%',
    backgroundColor: 'white',
  })

  const getCalendarContainerStyle = () => ({
    marginTop: '1%'
  })

  const getSpreadSheetStyle = () => ({
    '.Spreadsheet td': {
      whiteSpace: 'pre'
    }
  })

  return (
    <div style={getContainerStyle()}>
      <div>
        <JiraPlanningCalendarFilter
          filterHandler={filterHandler}
        />
      </div>
      <div style={getCalendarContainerStyle()}>
        <DragDropContext onDragEnd={onDragEnd}>
          <Spreadsheet style={getSpreadSheetStyle} data={data} />
          {/* <Spreadsheet data={data} /> */}
        </DragDropContext>
      </div>
    </div>
  )
}

export default JiraPlanningCalendar;