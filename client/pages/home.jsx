import React from 'react';
import Header from '../components/header';
import Footer from '../components/footer';
import CurrentSpending from '../components/current-spending';
import YearlySnapshot from '../components/yearly-snapshot';

export default function Home(props) {
  return (
    <div className='container'>
      <Header />
      <div className='body-sections'>
        <CurrentSpending />
        <YearlySnapshot />
      </div>
      <Footer />
    </div>
  );
}
