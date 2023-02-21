import React from 'react';
import CurrentSpending from '../components/current-spending';
import YearlySnapshot from '../components/yearly-snapshot';

export default function Home(props) {
  return (
    <div className='container'>
      <div className='body-sections'>
        <CurrentSpending entries={props.entries} />
        <YearlySnapshot />
      </div>
    </div>
  );
}
