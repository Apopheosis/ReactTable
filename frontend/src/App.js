import React, {Component} from 'react';
import Table from './Table'
class App extends Component {
  initialState = {
    entries: [],
    initialEntries: [],
    toggleSort: true
  }
  state = this.initialState;


  async componentDidMount() {
    try {
      const res = await fetch('http://127.0.0.1:8000/api/');
      const entries = await res.json();

      this.setState({
        entries: entries,
        initialEntries: entries
      });
      this.initialSliceEntries();
    } catch (e) {
      console.log(e);
    }
  }

  sortEntries = (parameter) => {
    const {entries, toggleSort} = this.state;
    if (toggleSort) {
      console.log(toggleSort)
      let updatedEntries = parameter === 'Title' ? entries.sort((a, b) => a[parameter].localeCompare(b[parameter]))
          : entries.sort((a, b) => (
              this.state.toggleSort === true
                  ? a[parameter] - b[parameter] : b[parameter] - a[parameter]
          ));
      this.setState({
        entries: updatedEntries,
        toggleSort: false
      })
    } else {
      console.log(toggleSort)
      this.setState({
        entries: parameter === 'Title' ? entries.sort((a, b) => a[parameter].localeCompare(b[parameter])).reverse()
            : entries.sort((a, b) => (
                this.state.toggleSort === true
                    ? a[parameter] - b[parameter] : b[parameter] - a[parameter]
            )),
        toggleSort: true
      })
      console.log(entries.map(entry => entry[parameter]));
    }
  }

  initialSliceEntries = () => {
    const {entries} = this.state;
    let updatedEntries = this.state.initialEntries.slice(0, 5);
    this.setState({
      entries: updatedEntries
    })
    console.log(this.state.entries);

  }

  sliceEntries = (event) => {
    const {entries} = this.state;
    const {outerText} = event.target;
    const index = parseInt(outerText);
    this.setState({
      entries: this.state.initialEntries.slice(5*(index-1), (5*(index-1))+5)
    })
  }

  filterList = (event) => {
    const {value} = event.target;
    const pageEntries = this.state.entries;
    if (value==='') {
      this.initialSliceEntries();
      document.getElementById('value').style.outlineColor = 'red';
    } else {
      const {entries} = this.state;

      const parameter = document.getElementById('parameter').value;
      const condition = document.getElementById('condition').value;
      let updatedEntries = entries.filter(entry => {
        console.log(entry[parameter] + ' ' + condition + ' ' + value);
        switch(condition) {
          case 'greater than': {
            return parameter==='Date' ? Date(entry[parameter]) > Date(value) :
                entry[parameter] > parseInt(value);
          }
          case 'lesser than': {
            return parameter==='Date' ? Date(entry[parameter]) < Date(value) :
                entry[parameter] < parseInt(value);
          }
          case 'equal to': {
            return parameter==='Title' ? entry[parameter] === value.toString() :
                parameter==='Date' ? entry[parameter] === value.toString() :
                entry[parameter] == parseInt(value);
          }
          case 'contains': {
            return entry[parameter].toString().toLowerCase().indexOf(value.toLowerCase()) !== -1;
          }
          default: break;
        }
      });

      this.setState({
        entries: updatedEntries
      })
      }

  };
  render() {

    return (

        <div className="App">

          <Table entriesData={this.state.entries} sortEntries={this.sortEntries} sliceEntries={this.sliceEntries} initialEntriesData={this.state.initialEntries}/>
          <span>
            <select id="parameter" value={this.state.value}>
              <option value="id">id</option>
              <option value="Title">Title</option>
              <option value="Count">Count</option>
              <option value="Distance">Distance</option>
            </select>
            <select id="condition" value={this.state.value}>
              <option value="greater than">greater than</option>
              <option value="equal to">equal to</option>
              <option value="lesser than">lesser than</option>
              <option value="contains">contains</option>
            </select>
            <input type='text' id="value" onChange={this.filterList}></input>
          </span>
        </div>
    );
  }
}

export default App;