import React, { Component } from 'react';
import Board from './comp/Board.js';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header>
          drag n' drop!
        </header>
        <Board/>
      </div>
    );
  }
}

export default App;
