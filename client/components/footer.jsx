import React from 'react';

export default function Footer(props) {
  return (
    <footer>
      <div className='footer-banner'/>
      <div className="footer-buttons">
        <div className="footer-button">
          <i className="fa-solid fa-house" />
          <p>Home</p>
        </div>
        <div className="footer-button">
          <i className="fa-solid fa-square-plus" />
          <p>Add</p>
        </div>
        <div className="footer-button">
          <i className="fa-solid fa-chart-simple" />
          <p>Spending</p>
        </div>
      </div>
    </footer>
  );
}
