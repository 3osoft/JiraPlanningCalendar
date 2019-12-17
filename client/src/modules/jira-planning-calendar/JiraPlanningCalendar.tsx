import React, { Dispatch } from 'react';
import Spreadsheet from "react-spreadsheet";
import { fetchData, filterData } from './actions';
import { UserParser } from '../user/user-parser';
import { SheetDataBuilder } from './data-builder';
import { getData } from './data-loader';
import { IssueParser } from '../issue/issue-parser';
import { AnyAction } from 'redux';
import { connect } from 'react-redux';
import './JiraPlanningCalendar.css'
import JiraPlanningCalendarFilter from './filter/JiraPlanningCalendarFilter';

interface StateToProps {
  data: any
}

interface DispatchProps {
  fetchData: (data) => void,
  filterData: (data) => void
}

type Props = StateToProps & DispatchProps
class JiraPlanningCalendar extends React.Component<Props, {}> {  

  filterHandler = (data) => {
    this.props.filterData(data);
  }

  render() {
    return (
      <div className="container">
        <div>
          <JiraPlanningCalendarFilter 
            filterHandler={this.filterHandler}
          />  
        </div>
        <div className="roster-container">
          <Spreadsheet data={this.props.data} />  
        </div>
      </div>
     
    )
  }

  componentWillMount() {
    getData().then(x => {
      console.log(x);
      const users = new UserParser().parseArrayFromJson(x[0].data);
      const issues = new IssueParser().parseArrayFromJson(x[1].data.issues);

      console.log(users);
      console.log(issues);

      const data = new SheetDataBuilder()
        .addUsers(users)
        .addIssues(issues)
        .build();

      this.props.fetchData(data);
    }, err => {
      console.log(err);
    });
  }
}

const mapStateToProps = (state) => {
  return { 
    data: state.data
  } as StateToProps
}

const mapDispatchProps = (dispatch: Dispatch<AnyAction>) => ({
  fetchData: (data) => dispatch(fetchData(data)),
  filterData: (data) => dispatch(filterData(data))
} as DispatchProps);

export default connect(mapStateToProps, mapDispatchProps)(JiraPlanningCalendar)
