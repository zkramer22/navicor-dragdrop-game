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
      cards: shuffler(CARDS[0]),
      cardCheck: [],
      scoreOpacity: '0',
      scoreBottom: '30%',
    };

    this.handleCardDrop = this.handleCardDrop.bind(this);
  }

  scoreIndicator() {
    setTimeout(() => this.setState({ scoreOpacity: '0' }), 1000);
    setTimeout(() => this.setState({ scoreBottom: '30%' }), 1500);
  }

  updateScore(val) {
    this.props.handleScore(val);
    this.setState({
      scoreOpacity: '1',
      scoreBottom: '40%'
    });
    this.scoreIndicator();
  }

  nextTerm() {
    const { termIdx } = this.state;
    if (termIdx < Object.values(TERMS).length - 1) {
      this.setState({
        termIdx: this.state.termIdx + 1,
        cards: shuffler(CARDS[termIdx + 1])
      });
    }
    else {
      this.setState({
        termIdx: 0,
        cards: shuffler(CARDS[0])
      });
      this.resetTerms();
    }
  }

  resetTerms() {
    console.log('reset them bishes');
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
    const { cards, termIdx, scoreBottom, scoreOpacity } = this.state;

    const termObj   = this.state.terms[termIdx],
          term      = termObj.term,
          def       = termObj.def;

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

      </div>
    );
  }
}

export default Board;
