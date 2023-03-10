import React from 'react';

export default class MonthlyView extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      monthClicked: true,
      currentMonth: null,
      monthlyTotal: 0,
      categoryNames: [],
      categoryTotals: []
    };
    this.handleMonthClick = this.handleMonthClick.bind(this);
    this.handleYearClick = this.handleYearClick.bind(this);
  }

  componentDidMount() {
    const currentMonth = this.getCurrentMonth();
    this.setState({ currentMonth });
    fetch('/api/entries/monthlyTotal')
      .then(res => res.json())
      .then(data => {
        this.setState({ monthlyTotal: data.monthlytotal });
      })
      .catch(err => {
        //  eslint-disable-next-line no-console
        console.log(err);
      });

    fetch('/api/entries/monthlyCategoryTotals')
      .then(res => res.json())
      .then(data => {
        const categoryNames = Object.keys(data);
        const categoryTotals = Object.values(data);
        this.setState({ categoryNames, categoryTotals });
      })
      .catch(err => {
        // eslint-disable-next-line no-console
        console.log(err);
      });
  }

  getCurrentMonth() {
    const now = new Date();
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const monthIndex = now.getMonth();
    return monthNames[monthIndex];
  }

  handleMonthClick() {
    this.setState({ monthClicked: true });
  }

  handleYearClick() {
    this.setState({ monthClicked: false });
  }

  render() {
    const { currentMonth, monthlyTotal, categoryNames, categoryTotals } = this.state;
    const firstFourCategories = categoryNames.slice(0, 4);
    const lastFourCategories = categoryNames.slice(4);
    const firstFourTotals = categoryTotals.slice(0, 4);
    const lastFourTotals = categoryTotals.slice(4);
    return (
      <div className='body-sections'>
        <div className='one-third-card'>
          <div className='month-year-buttons'>
            <button
              className={`section-titles month-year-style ${this.state.monthClicked ? 'active-button' : 'inactive-button'}`}
              onClick={this.handleMonthClick}
            >
              {currentMonth}
            </button>
            <button
              className={`section-titles month-year-style ${this.state.monthClicked ? 'inactive-button' : 'active-button'}`}
              onClick={this.handleYearClick}
            >
              This Year
            </button>
          </div>
        </div>
        <div className='monthly-pie-chart'>
          <div className='top-spending-container'>
            <div className='section-titles'>
              Expenses This Month
            </div>
            <div className='section-titles'>
              ${monthlyTotal}
            </div>
          </div>
          <div className='category-container'>
            <div className='section-titles'>Spending by Category</div>
            <div className='category-col-container'>
              <div className='category-col'>
                {firstFourCategories.map((categoryName, index) => (
                  <div key={categoryName}>
                    {categoryName}: ${firstFourTotals[index]}
                  </div>
                ))}
              </div>
              <div className='category-col'>
                {lastFourCategories.map((categoryName, index) => (
                  <div key={categoryName}>
                    {categoryName}: ${lastFourTotals[index]}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
