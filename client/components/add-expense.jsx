import React from 'react';

export default function AddExpense(props) {
  return (
    <form className='add-view'>
      <h3 className='section-titles'>Add Expense</h3>
      <div className='form'>
        <div className='form-item'>
          <label htmlFor='purchase-item'>Purchase Item</label>
          <input type='text' id='purchase-item' />
        </div>
        <div className='form-item'>
          <label htmlFor='amount'>Amount</label>
          <input type='text' id='amount' placeholder='0.00' required />
        </div>
        <div className='form-item'>
          <label htmlFor='time-and-date'>Date of Expense</label>
          <input type='datetime-local' id='time-and-date' />
        </div>
        <div className='form-item'>
          <label htmlFor='transaction-type'>Transaction Type</label>
          <select id='transaction-type'>
            <option disabled selected>Select Below</option>
            <option>Food & Drink</option>
            <option>Entertainment</option>
            <option>Bills & Utilities</option>
            <option>Health</option>
            <option>Housing</option>
            <option>Shopping</option>
            <option>Transportation</option>
            <option>Other</option>
          </select>
        </div>
      </div>
      <div className='form-footer'>
        <button className='form-buttons confirm' type='submit'>Add Expense</button>
        <button className='form-buttons deny'>Cancel</button>
      </div>
    </form>
  );
}
