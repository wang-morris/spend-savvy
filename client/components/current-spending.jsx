import React from 'react';

export default class CurrentSpending extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editEntryId: ''
    };
  }

  static defaultProps = {
    entries: []
  };

  editButtonClick(entry) {
    const id = entry[0].entryId;
    this.props.updateEditEntryId(id);
    window.location.hash = 'edit';
  }

  render() {
    const entries = this.props.entries.slice(-50);
    const typeMap = {
      1: 'Food & Drink',
      2: 'Entertainment',
      3: 'Bills & Utilities',
      4: 'Health',
      5: 'Housing',
      6: 'Shopping',
      7: 'Transportation',
      8: 'Other'
    };

    return (
      <div className='two-thirds-card'>
        <label className='section-titles current-card'>Current Spending</label>
        {
          (entries.length === 0)
            ? (
              <div className='empty-table'>Please click the Add button to start tracking!</div>
              )
            : (
              <table className='current-spending-table'>
                <tbody className='current-spending-body'>
                  {entries.map(entry => {
                    if (!entry || !entry[0]) {
                      return null;
                    }
                    return (
                      <tr className='list-container' key={entry[0].entryId}>
                        <td>{entry[0].item}
                          <div className='list-category'>{typeMap[entry[0].typeId]}</div>
                        </td>
                        <td>${entry[0].amount}
                          <button className='edit-button' onClick={() => this.editButtonClick(entry)}>
                            <i className="fa-solid fa-pen-to-square" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              )
        }
      </div>
    );
  }
}
