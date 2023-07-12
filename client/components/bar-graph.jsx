import React from 'react';
import { ResponsiveContainer, BarChart, XAxis, YAxis, Tooltip, Bar } from 'recharts';

export default class BarGraph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      yearlyData: this.getDefaultData()
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
        // eslint-disable-next-line no-console
        console.log(err);
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
          <Bar dataKey="spending" fill="#8884d8"/>
        </BarChart>
      </ResponsiveContainer>
    );
  }
}
