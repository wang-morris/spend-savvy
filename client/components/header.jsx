import React from 'react';

export default function Header(props) {
  return (
    <header>
      <div className='header-banner' />
      <div className='header-container'>
        <div className='title'>Spend Savvy</div>
        <div className='links'>
          <a href='#'>Home</a>
          <a href='#add'>Add</a>
          <a href='#spending'>Spending</a>
        </div>
      </div>
    </header>
  );
}
