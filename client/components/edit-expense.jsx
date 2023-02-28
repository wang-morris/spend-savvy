import React from 'react';

export default class EditExpense extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      typeId: 'default',
      userId: 1,
      item: '',
      amount: '',
      createdAt: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleDeleteClick() {
    window.location.hash = '#';
  }

  handleSubmit(event) {
    event.preventDefault();

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

    fetch(`/api/entries/${this.props.editEntryId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        typeId: typeMap[this.state.typeId],
        userId: this.state.userId,
        item: this.state.item,
        amount: this.state.amount,
        createdAt: this.state.createdAt
      })
    })
      .then(res => res.json())
      .then(data => {
        this.setState({
          typeId: 'default',
          item: '',
          amount: '',
          createdAt: ''
        });
        this.props.updateEditedFrontEnd(data);
        window.location.hash = '#';
      })
      .catch(err => {
        // eslint-disable-next-line no-console
        console.log('error:', err);
      });

  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className='add-view'>
        <h3 className='section-titles'>Edit Expense</h3>
        <div className='form'>
          <div className='form-item'>
            <label htmlFor='item'>Purchase Item</label>
            <input type='text' id='item' name='item' value={this.state.item} onChange={this.handleChange} />
          </div>
          <div className='form-item'>
            <label htmlFor='amount'>Amount</label>
            <input type='text' id='amount' name='amount' value={this.state.amount} onChange={this.handleChange} placeholder='0.00' required />
          </div>
          <div className='form-item'>
            <label htmlFor='createdAt'>Date of Expense</label>
            <input type='datetime-local' id='createdAt' name='createdAt' value={this.state.createdAt} onChange={this.handleChange} />
          </div>
          <div className='form-item'>
            <label htmlFor='typeId'>Transaction Type</label>
            <select id='typeId' name='typeId' defaultValue={this.state.typeId} onChange={this.handleChange}>
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
          <button className='form-buttons confirm' type='submit'>Edit Expense</button>
          <button className='form-buttons deny' onClick={this.handleDeleteClick}>Delete</button>
        </div>
      </form>
    );
  }
}
