import React, { Component } from 'react';
import Slot from './Slot.js';
import Card from './Card.js';
import lifeImg from '../img/life.png';
import lifeLostImg from '../img/life-lost.png';

import { CARDS, shuffler } from '../data/CardData.js';
import { TERMS } from '../data/TermData.js';

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      terms: TERMS,
      termIdx: 0,
      cards: shuffler(CARDS[0]),
      cardCheck: [],
      score: 0,
      scoreOpacity: '0',
      scoreBottom: '30%',
      lives: 3,
      timer: 15,
      defaultTimer: 15,
      countdown: null
    };

    this.handleCardDrop = this.handleCardDrop.bind(this);
  }

  componentDidMount() {
    // setTimeout(() => this.countDown(), 2000);
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
      this.restartTimer(this.state.defaultTimer);
    }
  }

  countDown() {
    this.setState({ countdown: setInterval(() => this.tickTimer(), 1000) });
  }

  stopTimer() {
    clearInterval(this.state.countdown);
  }

  scoreIndicator() {
    setTimeout(() => this.setState({ scoreOpacity: '0' }), 1000);
    setTimeout(() => this.setState({ scoreBottom: '30%' }), 1500);
  }

  updateScore(val) {
    this.setState({
      score: this.state.score + val,
      defaultTimer: this.state.defaultTimer - 1,
      scoreOpacity: '1',
      scoreBottom: '40%'
    });
    this.scoreIndicator();
    this.restartTimer(this.state.defaultTimer);
  }

  nextTerm() {
    const { termIdx } = this.state;
    this.setState({
      termIdx: this.state.termIdx + 1,
      cards: shuffler(CARDS[termIdx + 1])
    });
  }

  returnCards(cardCheck) {
    cardCheck.forEach(card => {
      card.setState({
        controlledPosition: { x: 0, y: 0 },
        border: '1px solid',
        pointerEvents: 'auto'
      });
      setTimeout(() => card.setState({ transition: 'initial' }), 300);
    });
  }

  handleCardDrop(card, word) {
    const { termIdx, cardCheck } = this.state;
    TERMS[termIdx].completed[word] = true;
    cardCheck.push(card);

    if (Object.values(TERMS[termIdx].completed).every(Boolean)) {
      this.updateScore(1);
      setTimeout(() => {
        this.returnCards(cardCheck);
        this.nextTerm();
      }, 750);
    }
  }

  render() {
    const { cards, termIdx, score, scoreBottom, scoreOpacity, timer, lives } = this.state;

    const termObj   = this.state.terms[termIdx],
          term      = termObj.term,
          def       = termObj.def;


    let livesArr = [];
    for (let i = 0; i < 3; i++) {
      if (lives > i) {
        livesArr.push(true)
      }
      else {
        livesArr.push(false)
      }
    }

    return (
      <div className="board-wrapper">
        <div className="term-wrapper">
          <h2>{ term }</h2>
        </div>

        <div className="definition-wrapper">
          { def.map((word, i) => {
              return (
                <Slot key={ i } word={ word }/>
              )
            })
          }

          <div id="score-animation-wrapper" style={{ bottom: scoreBottom, opacity: scoreOpacity }}>
            <h1>+1</h1>
          </div>
        </div>

        <div className="deck-wrapper">
          { cards.map((card, i) => {
              return (
                <Card handleCardDrop={ this.handleCardDrop }
                      key={ i }
                      word={ card.word } />
              )
            })
          }
        </div>

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
    );
  }
}

export default Board;
