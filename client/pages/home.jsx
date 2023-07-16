import React from 'react';
import CurrentSpending from '../components/current-spending';
import YearlySnapshot from '../components/yearly-snapshot';

export default function Home(props) {
  return (
    <div className='body-sections'>
      <CurrentSpending entries={props.entries} updateEditEntryId={props.updateEditEntryId} updateDeletedFrontEnd={props.updateDeletedFrontEnd} />
      <YearlySnapshot />
    </div>
  );
}
