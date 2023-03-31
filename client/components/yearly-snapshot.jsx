import React from 'react';
import BarGraph from '../components/bar-graph.jsx';

export default class YearlySnapshot extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      yearlyTotal: 0
    };
  }

  componentDidMount() {
    fetch('/api/entries/yearlyTotal')
      .then(res => res.json())
      .then(data => {
        this.setState({ yearlyTotal: data.yearlytotal ? parseFloat(data.yearlytotal) : 0 });
      })
      .catch(err => {
        // eslint-disable-next-line no-console
        console.log(err);
      });
  }

  render() {
    const yearlyTotalFormatted = this.state.yearlyTotal.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });

    return (
      <div className='snapshot-view'>
        <label className='section-titles'>YTD Snapshot</label>
        <p className='section-subtitles'>${yearlyTotalFormatted}</p>
        <BarGraph />
      </div>
    );
  }
}
