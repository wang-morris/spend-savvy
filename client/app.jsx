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
      route: parseRoute(window.location.hash),
      entries: [],
      editEntryId: null
    };
    this.newEntry = this.newEntry.bind(this);
    this.updateEditEntryId = this.updateEditEntryId.bind(this);
    this.updateEditedFrontEnd = this.updateEditedFrontEnd.bind(this);
    this.updateDeletedFrontEnd = this.updateDeletedFrontEnd.bind(this);
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
    return (
      <div className='container'>
        <Header />
        { this.renderPage() }
        <Footer />
      </div>
    );
  }
}
