import React from 'react';
import AddExpense from '../components/add-expense';

export default class AddView extends React.Component {
  render() {
    return (
      <div className='page-container'>
        <AddExpense newEntry={this.props.newEntry} />
      </div>
    );
  }
}
