import React from 'react';
import EditExpense from '../components/edit-expense';

export default class EditView extends React.Component {
  render() {
    return (
      <EditExpense editEntryId={this.props.editEntryId} entry={this.props.entry} updateEditedFrontEnd={this.props.updateEditedFrontEnd} updateDeletedFrontEnd={this.props.updateDeletedFrontEnd} />
    );
  }
}
