import React from 'react';
import AddExpense from '../components/add-expense';

export default class AddView extends React.Component {
  render() {
    return (
      <AddExpense newEntry={this.props.newEntry} />
    );
  }
}
