import React from 'react';
import Header from '../components/header';
import Footer from '../components/footer';
import CurrentSpending from '../components/current-spending';

export default function Home(props) {
  return (
    <div className='container'>
      <Header />
      <CurrentSpending />
      <Footer />
    </div>
  );
}
