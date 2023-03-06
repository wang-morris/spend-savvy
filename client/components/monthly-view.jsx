import React from 'react';
import MonthlyChart from './monthly-chart';

export default class MonthlyView extends React.Component {
  constructor(props) {
    super(props);
    this.state = { monthClicked: true };
    this.handleMonthClick = this.handleMonthClick.bind(this);
    this.handleYearClick = this.handleYearClick.bind(this);
  }

  handleMonthClick() {
    this.setState({ monthClicked: true });
  }

  handleYearClick() {
    this.setState({ monthClicked: false });
  }

  render() {
    return (
      <div className='body-sections'>
        <div className='two-thirds-card'>
          <div className='month-year-buttons'>
            <button
              className={`section-titles month-year-style ${this.state.monthClicked ? 'active-button' : 'inactive-button'}`}
              onClick={this.handleMonthClick}
            >
              This Month
            </button>
            <button
              className={`section-titles month-year-style ${this.state.monthClicked ? 'inactive-button' : 'active-button'}`}
              onClick={this.handleYearClick}
            >
              This Year
            </button>
          </div>
          <div className='top-spending-container'>
            <div className='section-titles'>
              (Current Month) Total
            </div>
            <div className='section-titles'>
              $0000
            </div>
          </div>
        </div>
        <div className='snapshot-view'>
          <MonthlyChart />
        </div>
      </div>
    );
  }
}
