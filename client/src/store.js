import { createStore } from 'redux';
import sheetReducer from './modules/jira-planning-calendar/reducers';

export default createStore(sheetReducer);
