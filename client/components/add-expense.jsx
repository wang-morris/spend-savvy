import React from 'react';

export default class AddExpense extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      typeId: 'default',
      userId: 1,
      item: '',
      amount: '',
      createdAt: '',
      errorMessage: '',
      isLoading: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancelClick = this.handleCancelClick.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleCancelClick() {
    window.location.hash = '#';
  }

  handleSubmit(event) {
    event.preventDefault();

    this.setState({ isLoading: true });

    const numberRegex = /^\d*\.?\d*$/;
    if (!numberRegex.test(this.state.amount)) {
      this.setState({ errorMessage: 'Please only enter valid number characters.', isLoading: false });
      return;
    }

    const amountRegex = /^\d+(\.\d{1,2})?$/;
    let correctedAmount = this.state.amount.startsWith('.') ? `0${this.state.amount}` : this.state.amount;
    correctedAmount = parseFloat(correctedAmount).toFixed(2);

    if (!amountRegex.test(correctedAmount)) {
      this.setState({ errorMessage: 'Please enter a valid number with up to two decimal places.', isLoading: false });
      return;
    }

    const typeMap = {
      'Food & Drink': 1,
      Entertainment: 2,
      'Bills & Utilities': 3,
      Health: 4,
      Housing: 5,
      Shopping: 6,
      Transportation: 7,
      Other: 8,
      default: 8
    };

    fetch('api/entries', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        entryId: this.state.entryId,
        typeId: typeMap[this.state.typeId],
        userId: this.state.userId,
        item: this.state.item,
        amount: correctedAmount,
        dateOfExpense: this.state.createdAt
      })
    })
      .then(response => {
        if (!response.ok) {
          return response.json().then(error => {
            throw new Error(error.error);
          });
        }
        return response.json();
      })

      .then(data => {
        this.props.newEntry(data);
        this.setState({
          typeId: 'default',
          item: '',
          amount: '',
          dateOfExpense: '',
          date: '',
          isLoading: false
        });
        window.location.hash = '#';
      })
      .catch(err => {
        this.setState({ errorMessage: 'An unexpected error has occurred.', isLoading: false });
        console.error('error:', err);
      });

  }

  render() {
    if (this.state.isLoading) {
      return (
        <div className="lds-facebook">
          <div />
          <div />
          <div />
        </div>
      );
    }

    return (
      <form onSubmit={this.handleSubmit} className='add-view'>
        <h3 className='section-titles'>Add Expense</h3>
        <div className='form'>
          <div className='form-item'>
            <label htmlFor='item'>Purchase Item</label>
            <input type='text' id='item' name='item' value={this.state.item} onChange={this.handleChange} required />
          </div>
          <div className='form-item'>
            <label htmlFor='amount'>Amount</label>
            <input type='text' id='amount' name='amount' value={this.state.amount} onChange={this.handleChange} placeholder='0.00' required />
            {this.state.errorMessage && <div className='error-message'>{this.state.errorMessage}</div>}
          </div>
          <div className='form-item'>
            <label htmlFor='createdAt'>Date of Expense</label>
            <input type='datetime-local' id='createdAt' name='createdAt' value={this.state.createdAt} onChange={this.handleChange} required />
          </div>
          <div className='form-item'>
            <label htmlFor='typeId'>Transaction Type</label>
            <select id='typeId' name='typeId' defaultValue={this.state.typeId} onChange={this.handleChange} required>
              <option disabled value='default'>Select Below</option>
              <option value='Food & Drink'>Food & Drink</option>
              <option value='Entertainment'>Entertainment</option>
              <option value='Bills & Utilities'>Bills & Utilities</option>
              <option value='Health'>Health</option>
              <option value='Housing'>Housing</option>
              <option value='Shopping'>Shopping</option>
              <option value='Transportation'>Transportation</option>
              <option value='Other'>Other</option>
            </select>
          </div>
        </div>
        <div className='form-footer'>
          <button className='form-buttons confirm' type='submit'>Add Expense</button>
          <button className='form-buttons deny' onClick={this.handleCancelClick}>Cancel</button>
        </div>
      </form>
    );
  }
}
