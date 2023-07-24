import React from 'react';
import { ResponsiveContainer, BarChart, XAxis, YAxis, Tooltip, Bar } from 'recharts';

export default class BarGraph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      yearlyData: this.getDefaultData(),
      errorMessage: null
    };
  }

  componentDidMount() {
    fetch('/api/entries/yearlySnapshot')
      .then(res => res.json())
      .then(data => {
        const updatedData = [...this.state.yearlyData];

        data.forEach(item => {
          const monthIndex = parseInt(item.month, 10) - 1;
          updatedData[monthIndex].spending = item.spending;
        });

        this.setState({ yearlyData: updatedData });

      })
      .catch(err => {
        console.error('error:', err);
        this.setState({ errorMessage: 'An error occurred while fetching data.' });
      });
  }

  getDefaultData() {
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return monthNames.map(month => ({ month, spending: 0 }));
  }

  render() {
    return (
      <ResponsiveContainer width="95%" height="70%">
        <BarChart data={this.state.yearlyData}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          {this.state.errorMessage
            ? <text x={0} y={0} dx={90} dy={75} fontSize={12} fill="red">{this.state.errorMessage}</text>
            : <Bar dataKey="spending" fill="#8884d8" />
          }
        </BarChart>
      </ResponsiveContainer>
    );
  }
}
