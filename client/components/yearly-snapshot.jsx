import React from 'react';
import BarGraph from '../components/bar-graph.jsx';

export default class YearlySnapshot extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      yearlyTotal: 0,
      isLoading: true
    };
  }

  componentDidMount() {
    fetch('/api/entries/yearlyTotal')
      .then(res => res.json())
      .then(data => {
        this.setState({
          yearlyTotal: data.yearlytotal ? parseFloat(data.yearlytotal) : 0,
          isLoading: false
        });
      })
      .catch(err => {
        console.error('error:', err);
        this.setState({ isLoading: false });
      });
  }

  render() {
    const yearlyTotalFormatted = this.state.yearlyTotal.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });

    const graphContent = this.state.isLoading
      ? (
        <div className="snapshot-view-spinner">
          <div className="lds-facebook"><div /><div /><div /></div>
        </div>
        )
      : <BarGraph />;

    return (
      <div className='snapshot-view'>
        <label className='section-titles'>YTD Snapshot</label>
        <p className='section-subtitles'>${yearlyTotalFormatted}</p>
        {graphContent}
      </div>
    );
  }
}
