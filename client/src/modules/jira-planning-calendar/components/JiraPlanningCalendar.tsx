import React, { useEffect } from 'react';
import Spreadsheet from "react-spreadsheet";
import { fetchData } from '../actions';
import { useSelector, useDispatch } from 'react-redux';
import './JiraPlanningCalendar.css'
import JiraPlanningCalendarFilter from './filter/JiraPlanningCalendarFilter';
import { DataService } from '../data-service';
import { Query } from '../data-loader';

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
    dispatch(fetchData(result));
  }
  
  const loadData = async () => {
    return await dataService.loadData();
  }
  
  const filterData = async (query) => {
    return await dataService.loadData(query);
  }

  useEffect(() => {
    async function load() {
      const result = await loadData();      
      dispatch(fetchData(result));
    }    
    load();
  }, []);

  return (
    <div className="container">
      <div>
        <JiraPlanningCalendarFilter
          filterHandler={filterHandler}
        />
      </div>
      <div className="roster-container">
        <Spreadsheet data={data} />
      </div>
    </div>
  )
}

export default JiraPlanningCalendar;