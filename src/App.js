import React, { Component } from 'react';
import Board from './comp/Board.js';
import GameOver from './comp/GameOver.js';
import lifeImg from './img/life.png';
import lifeLostImg from './img/life-lost.png';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      score: 0,
      lives: 3,
      timer: 15,
      defaultTimer: 15,
      countdown: null,
      gameOver: false
    };

    this.handleScore = this.handleScore.bind(this);
  }

  componentDidMount() {
    setTimeout(() => this.countDown(), 2000);
  }

  restartTimer(sec) {
    this.stopTimer();
    if (sec) {
      this.setState({ timer: sec })
    }
    else {
      this.setState({ timer: 15 });
    }
    this.countDown();
  }

  tickTimer() {
    if (this.state.timer > 1) {
      this.setState({ timer: this.state.timer - 1 });
    }
    else {
      this.setState({ lives: this.state.lives - 1 });
      if (this.state.lives <= 0) {
        this.stopTimer();
        this.endGame();
      }
      else {
        this.restartTimer(this.state.defaultTimer);
      }
    }
  }

  countDown() {
    this.setState({ countdown: setInterval(() => this.tickTimer(), 1000) });
  }

  stopTimer() {
    clearInterval(this.state.countdown);
  }

  handleScore(val) {
    this.setState({
      score: this.state.score + val,
      defaultTimer: this.state.defaultTimer - 1
    });
    this.restartTimer(this.state.defaultTimer);
  }

  endGame() {
    setTimeout(() => this.setState({ gameOver: true }), 1500);
  }

  render() {
    const { score, lives, timer } = this.state;

    let livesArr = [];
    for (let i = 0; i < 3; i++) {
      if (lives > i) {
        livesArr.push(true);
      }
      else {
        livesArr.push(false);
      }
    }

    let appContent = null;
    if (!this.state.gameOver) {
      appContent = (
        <div className="App">
          <header>
            drag n' drop!
          </header>

          <Board  handleScore={ this.handleScore }/>

          <div className="score-wrapper">
            <h3>score :: { score }</h3>
          </div>

          <div className="timer-wrapper">
            <h3>timer :: { timer }</h3>
          </div>

          <div className="lives-wrapper">
            { livesArr.map((life, i) => {
                if (life) {
                  return (
                    <img className="lives" alt="life" key={ i } src={ lifeImg }/>
                  )
                }
                else {
                  return (
                    <img className="lives" alt="lifeLost" key={ i } src={ lifeLostImg }/>
                  )
                }
              })
            }
          </div>
        </div>
      )
    }
    else {
      appContent = (
        <div className="App">
          <GameOver score={ this.state.score } lives={ this.state.lives } />
        </div>
      );
    }

    return appContent;
  }
}

export default App;
