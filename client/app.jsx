import React from 'react';
import Home from './pages/home';
import Header from './components/header';
import Footer from './components/footer';
import AddView from './pages/add';
import EditView from './pages/edit';
import MonthlyView from './components/monthly-view';
import parseRoute from './lib/parse-route';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      offlineError: !navigator.onLine,
      route: parseRoute(window.location.hash),
      entries: [],
      editEntryId: null,
      contentHeight: window.innerHeight
    };
    this.newEntry = this.newEntry.bind(this);
    this.updateEditEntryId = this.updateEditEntryId.bind(this);
    this.updateEditedFrontEnd = this.updateEditedFrontEnd.bind(this);
    this.updateDeletedFrontEnd = this.updateDeletedFrontEnd.bind(this);
    this.handleResize = this.handleResize.bind(this);
  }

  componentDidMount() {
    window.addEventListener('hashchange', () => {
      this.setState({
        route: parseRoute(window.location.hash)
      });
    });

    window.addEventListener('online', this.handleOnline);
    window.addEventListener('offline', this.handleOffline);
    window.addEventListener('resize', this.handleResize);
    this.handleResize();

    const entries = JSON.parse(localStorage.getItem('entries')) || [];
    this.setState({ entries });
  }

  componentWillUnmount() {
    window.removeEventListener('online', this.handleOnline);
    window.removeEventListener('offline', this.handleOffline);
    window.removeEventListener('resize', this.handleResize);
  }

  handleResize() {
    const headerHeight = document.querySelector('.header-banner').offsetHeight;
    const footerHeight = document.querySelector('.footer-banner').offsetHeight;
    const viewportHeight = window.innerHeight;

    this.setState({ contentHeight: viewportHeight - headerHeight - footerHeight });
  }

  handleOffline = () => {
    this.setState({ offlineError: true });
  };

  handleOnline = () => {
    this.setState({ offlineError: false });
  };

  updateEntries = newEntries => {
    this.setState({ entries: newEntries }, () => {
      localStorage.setItem('entries', JSON.stringify(this.state.entries));
    });
  };

  newEntry(entry) {
    const updatedEntries = [entry, ...this.state.entries];
    this.setState({
      entries: updatedEntries
    }, () => {
      localStorage.setItem('entries', JSON.stringify(updatedEntries));
    });
  }

  updateEditEntryId(id) {
    this.setState({ editEntryId: parseInt(id) }, () => {
    });
  }

  updateEditedFrontEnd(entry) {
    const updatedEntries = this.state.entries.map(nestedArr => {
      const updatedNestedArr = nestedArr.map(obj => {
        if (obj.entryId === entry.entryId) {
          return entry;
        } else {
          return obj;
        }
      });
      return updatedNestedArr;
    });
    this.updateEntries(updatedEntries);

    this.setState({
      entries: updatedEntries
    });
  }

  updateDeletedFrontEnd(entryId) {
    const updatedEntries = this.state.entries.filter(entry => {
      return entry[0].entryId !== entryId;
    });
    this.setState({
      entries: updatedEntries
    });
    this.updateEntries(updatedEntries);
  }

  renderPage() {
    const { route } = this.state;
    if (route.path === '') {
      return <Home entries={this.state.entries} updateEditEntryId={this.updateEditEntryId} />;
    } else if (route.path === 'add') {
      return <AddView newEntry={this.newEntry} />;
    } else if (route.path === 'spending') {
      return <MonthlyView />;
    } else if (route.path === 'edit') {
      return <EditView editEntryId={this.state.editEntryId} entry={this.state.entries.map(entryArray => entryArray[0]).find(entry => entry.entryId === this.state.editEntryId)} updateEditedFrontEnd={this.updateEditedFrontEnd} updateDeletedFrontEnd={this.updateDeletedFrontEnd} />;
    }
  }

  render() {
    const { offlineError, contentHeight } = this.state;

    return (
      <div className='container'>
        <Header />
        {offlineError && (
          <div className='offline-overlay'>
            <div className='offline-error'>
              Network is offline. Please check your internet connection and try again.
            </div>
          </div>
        )}
        <div className='content-wrapper' style={{ height: `${contentHeight}px` }}>
          {this.renderPage()}
        </div>
        <Footer />
      </div>
    );
  }
}
