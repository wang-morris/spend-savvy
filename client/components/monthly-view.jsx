import React from 'react';

export default class MonthlyView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      monthClicked: true,
      currentMonth: null,
      currentYear: null,
      monthlyTotal: 0,
      categoryNames: [],
      categoryTotals: [],
      categoryPercentages: [],
      yearlyTotal: 0,
      yearlyCategoryTotals: []
    };
    this.handleMonthClick = this.handleMonthClick.bind(this);
    this.handleYearClick = this.handleYearClick.bind(this);
  }

  componentDidMount() {
    const currentMonth = this.getCurrentMonth();
    const currentYear = this.getCurrentYear();
    this.setState({ currentMonth, currentYear });

    Promise.all([
      fetch('/api/entries/monthlyTotal')
        .then(res => res.json()),
      fetch('/api/entries/monthlyCategoryTotals')
        .then(res => res.json()),
      fetch('/api/entries/yearlyTotal')
        .then(res => res.json()),
      fetch('/api/entries/yearlyCategoryTotals')
        .then(res => res.json())
    ])
      .then(([monthlyTotalData, monthlyCategoryData, yearlyTotalData, yearlyCategoryData]) => {
        const monthlyTotal = parseFloat(monthlyTotalData.monthlytotal);
        const mergedCategories = { ...monthlyCategoryData, ...yearlyCategoryData };
        const categoryNames = Object.keys(mergedCategories);
        const categoryTotals = Object.values(monthlyCategoryData);
        const categoryPercentages = this.calculateCategoryPercentages(categoryTotals, monthlyTotal);

        const yearlyTotal = parseFloat(yearlyTotalData.yearlytotal);
        const mappedYearlyCategoryTotals = categoryNames.map(categoryName => {
          return yearlyCategoryData[categoryName] || 0;
        });
        const yearlyCategoryPercentages = this.calculateCategoryPercentages(mappedYearlyCategoryTotals, yearlyTotal);

        this.setState({
          monthlyTotal,
          categoryNames,
          categoryTotals,
          categoryPercentages,
          yearlyTotal,
          yearlyCategoryTotals: mappedYearlyCategoryTotals,
          yearlyCategoryPercentages
        });
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

  getCurrentYear() {
    const now = new Date();
    return now.getFullYear();
  }

  handleMonthClick() {
    this.setState({ monthClicked: true });
  }

  handleYearClick() {
    this.setState({ monthClicked: false });
  }

  calculateCategoryPercentages(categoryTotals, monthlyTotal) {
    if (monthlyTotal === 0) {
      return categoryTotals.map(() => 0);
    }
    return categoryTotals.map(total => (Number(total) / Number(monthlyTotal) * 100).toFixed(1));
  }

  render() {
    const { currentMonth, currentYear, monthlyTotal, categoryNames, categoryTotals, categoryPercentages, yearlyTotal, yearlyCategoryTotals } = this.state;

    const displayCategoryTotals = this.state.monthClicked ? categoryTotals : yearlyCategoryTotals;
    const displayCategoryPercentages = this.state.monthClicked
      ? categoryPercentages
      : this.calculateCategoryPercentages(displayCategoryTotals, yearlyTotal);

    const firstFourCategories = categoryNames.slice(0, 4);
    const lastFourCategories = categoryNames.slice(4);
    const firstFourTotals = displayCategoryTotals.slice(0, 4);
    const lastFourTotals = displayCategoryTotals.slice(4);
    const firstFourPercentages = displayCategoryPercentages.slice(0, 4);
    const lastFourPercentages = displayCategoryPercentages.slice(4);

    const commaMonthlyTotal = isNaN(monthlyTotal) ? '0' : monthlyTotal.toLocaleString(undefined, { useGrouping: true });
    const commaYearlyTotal = isNaN(yearlyTotal) ? '0' : yearlyTotal.toLocaleString(undefined, { useGrouping: true });

    return (
      <div className='body-sections'>
        <div className='one-third-card'>
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
              This year
            </button>
          </div>
          <div className='top-spending-container'>
            <div className='section-titles month-year-total'>
              {this.state.monthClicked ? `${currentMonth} Spending` : `${currentYear} Spending`}
            </div>
            <div className='section-titles big-number' key={this.state.monthClicked ? 'month' : 'year'}>
              ${this.state.monthClicked ? commaMonthlyTotal : commaYearlyTotal}
            </div>
          </div>
        </div>
        <div className='monthly-pie-chart'>
          <div className='category-container'>
            <div className='section-titles'>Spending by Category</div>
            <div className='category-col-container'>
              <div className='category-col'>
                {firstFourCategories.map((categoryName, index) => (
                  <div key={categoryName} className='category-item'>
                    <div className='category-name-container'>
                      <div className='category-name'>{categoryName}</div>
                      <div className='category-total'>
                        ${firstFourTotals[index]}
                      </div>
                    </div>
                    <div className='percentages'>{firstFourPercentages[index]}%</div>
                  </div>
                ))}
              </div>
              <div className='category-col'>
                {lastFourCategories.map((categoryName, index) => (
                  <div key={categoryName} className='category-item'>
                    <div className='category-name-container'>
                      <div className='category-name'>{categoryName}</div>
                      <div className='category-total'>
                        ${lastFourTotals[index]}
                      </div>
                    </div>
                    <div className='percentages'>{lastFourPercentages[index]}% </div>
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
