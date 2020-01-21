import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import JiraPlanningCalendar from './modules/jira-planning-calendar/components/JiraPlanningCalendar';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from './modules/jira-planning-calendar/reducers'
import { combineReducers } from 'redux-immer';
import produce from 'immer';

const store = createStore(combineReducers(produce, {
    reducer
}), applyMiddleware(thunk));

ReactDOM.render(
    <Provider store={store}>
        <JiraPlanningCalendar />
    </Provider>,
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
