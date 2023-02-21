import React from 'react';

export default class CurrentSpending extends React.Component {
  render() {
    const entries = this.props.entries;
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
                <tbody>
                  {entries.map(entry => {
                    return (
                      <tr className='list-container' key={entry[0].entryId}>
                        <td>{entry[0].item}
                          <div className='list-category'>{typeMap[entry[0].typeId]}</div>
                        </td>
                        <td>${entry[0].amount}</td>
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
