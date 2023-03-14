import React from 'react';
import BarGraph from '../components/bar-graph.jsx';

export default function YearlySnapshot(props) {
  return (
    <div className='snapshot-view'>
      <label className='section-titles'>Monthly? Snapshot</label>
      <p className='section-subtitles'>$0.00</p>
      <BarGraph />
    </div>
  );
}
