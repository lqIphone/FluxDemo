import React, { Component } from 'react';
import * as Actions from './flux/Actions';
import {CounterStore,SummaryStore} from './flux/Store';
class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      count: CounterStore.getCount(),
      all:SummaryStore.getSymmary()
    };
  }
  countState = () => {
    this.setState({
      count: CounterStore.getCount()
    })
  }
  summaryState=()=>{
    this.setState({
      all: SummaryStore.getSymmary()
    })
  }

  increment = () => {
    Actions.increment(10);
  }

  decrement = () => {
    Actions.decrement(10);
  }

  render() {
    return (
      <div className="App" >
        <h1>{this.state.count}</h1>
        <h1>{this.state.all}</h1>
        <button onClick={this.increment}>增加按钮</button>
        <button onClick={this.decrement}>减少按钮</button>
      </div>
    );
  }

  componentDidMount() {
    CounterStore.addChangeListener(this.countState);
    SummaryStore.addChangeListener(this.summaryState);
  }
  componentWillUnmount() {
    CounterStore.removeChangeListener(this.countState);
    SummaryStore.removeChangeListener(this.summaryState);
  }

}


export default App;
