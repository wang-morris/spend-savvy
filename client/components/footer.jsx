import React from 'react';

export default function Footer(props) {
  return (
    <footer>
      <div className='footer-banner'/>
      <div className="footer-buttons">
        <a href='#' className='footer-button'>
          <i className="fa-solid fa-house" />
          <p>Home</p>
        </a>
        <a href='#add' className='footer-button'>
          <i className="fa-solid fa-square-plus" />
          <p>Add</p>
        </a>
        <a href='#spending' className='footer-button'>
          <i className="fa-solid fa-chart-simple" />
          <p>Spending</p>
        </a>
      </div>
    </footer>
  );
}
