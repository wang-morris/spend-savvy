import React from 'react';

export default function CurrentSpending(props) {
  return (
    <div className='current-spending-view'>
      <textarea id='current-text' className='current-text' name='current-text' rows='4' cols='30' readOnly defaultValue='Please click the Add button to start tracking!'/>
    </div>
  );
}
