import React from 'react';
import Home from './pages/home';
import Header from './components/header';
import Footer from './components/footer';
import AddView from './pages/add';
import MonthlyView from './components/monthly-view';
import parseRoute from './lib/parse-route';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      route: parseRoute(window.location.hash),
      entries: []
    };
    this.newEntry = this.newEntry.bind(this);
  }

  componentDidMount() {
    window.addEventListener('hashchange', () => {
      this.setState({
        route: parseRoute(window.location.hash)
      });
    });
  }

  newEntry(entry) {
    this.setState({
      entries: [entry, ...this.state.entries]
    });
  }

  renderPage() {
    const { route } = this.state;
    if (route.path === '') {
      return <Home entries={this.state.entries} />;
    } else if (route.path === 'add') {
      return <AddView newEntry={this.newEntry} />;
    } else if (route.path === 'spending') {
      return <MonthlyView />;
    }
  }

  render() {
    return (
      <div className='container'>
        <Header />
        { this.renderPage() }
        <Footer />
      </div>
    );
  }
}
