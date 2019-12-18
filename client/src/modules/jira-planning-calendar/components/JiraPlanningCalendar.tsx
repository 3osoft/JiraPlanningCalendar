import React, { Dispatch } from 'react';
import Spreadsheet from "react-spreadsheet";
import { fetchData } from '../actions';
import { AnyAction } from 'redux';
import { connect } from 'react-redux';
import './JiraPlanningCalendar.css'
import JiraPlanningCalendarFilter from './filter/JiraPlanningCalendarFilter';
import { DataService } from '../data-service';
import { Query } from '../data-loader';

interface StateToProps {
  data: any
}

interface DispatchProps {
  fetchData: (data) => void
}

type Props = StateToProps & DispatchProps
class JiraPlanningCalendar extends React.Component<Props, {}> {
  private dataService: DataService;

  constructor(props: Props) {
    super(props);
    this.dataService = new DataService();
  }

  filterHandler = async (data) => {
    const query: Query = {
      userName: data.user,
      issue: data.issue
    }
    
    var result = await this.dataService.loadData(query);

    this.props.fetchData(result);
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
    this.dataService.loadData().then(x => {
      this.props.fetchData(x);
    });
  }
}

const mapStateToProps = (state) => {
  return {
    data: state.data
  } as StateToProps
}

const mapDispatchProps = (dispatch: Dispatch<AnyAction>) => ({
  fetchData: (data) => dispatch(fetchData(data))
} as DispatchProps);

export default connect(mapStateToProps, mapDispatchProps)(JiraPlanningCalendar)
