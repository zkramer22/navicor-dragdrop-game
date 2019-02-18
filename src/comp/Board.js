import React, { Component } from 'react';
import Slot from './Slot.js';
import Card from './Card.js';

import { CARDS, shuffler } from '../data/CardData.js';
import { TERMS } from '../data/TermData.js';

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      terms: TERMS,
      termIdx: 0,
      cards: shuffler(CARDS),
      cardCheck: [],
      score: 0,
      lives: 3,
      timer: 15,
      countdown: null
    };

    this.handleCardDrop = this.handleCardDrop.bind(this);
  }

  componentDidMount() {
    setTimeout(() => this.countDown(), 2000);
  }

  restartTimer() {
    this.stopTimer();
    this.setState({ timer: 15 });
    this.countDown();
  }

  tickTimer() {
    if (this.state.timer > 1) {
      this.setState({ timer: this.state.timer - 1 });
    }
    else {
      this.setState({ lives: this.state.lives - 1 });
      // gotta reset the timer and whatnot ya dingus
    }
  }

  countDown() {
    this.setState({ countdown: setInterval(() => this.tickTimer(), 1000) });
  }

  stopTimer() {
    clearInterval(this.state.countdown);
  }

  updateScore(val) {
    this.setState({ score: this.state.score + val });
  }

  nextTerm() {
    this.setState({ termIdx: this.state.termIdx + 1 });
  }

  returnCards(cardCheck) {
    cardCheck.forEach(card => {
      card.setState({ controlledPosition: { x: 0, y: 0 }, border: '1px solid' });
      setTimeout(() => card.setState({ transition: 'initial' }), 300);
    });
  }

  handleCardDrop(card, word) {
    const { termIdx, cardCheck } = this.state;
    TERMS[termIdx].completed[word] = true;
    cardCheck.push(card);

    if (Object.values(TERMS[termIdx].completed).every(Boolean)) {
      setTimeout(() => {
        this.returnCards(cardCheck);
        this.nextTerm();
        this.updateScore(1);
      }, 750);
    }
  }

  render() {
    const termIdx   = this.state.termIdx,
          termObj   = this.state.terms[termIdx],
          term      = termObj.term,
          def       = termObj.def;

    const { cards, score, timer, lives } = this.state;

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
          <h3>lives :: { lives }</h3>
        </div>

      </div>
    );
  }
}

export default Board;
