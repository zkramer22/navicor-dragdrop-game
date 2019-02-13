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
      cards: shuffler(CARDS)
    };

    this.handleCardDrop = this.handleCardDrop.bind(this);
  }

  handleCardDrop(card) {
    console.log('handling');
  }

  render() {
    const termIdx = this.state.termIdx,
          termObj = this.state.terms[termIdx],
          term    = termObj.term,
          def     = termObj.def,
          cards   = this.state.cards;

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
                      num={ i }
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

// return (
//   <div className="board-wrapper">
//   <Term term={ term } def={ def }/>
//   <Definition def={ def }/>
//   <Deck cards={ cards }/>
//   </div>
// );
