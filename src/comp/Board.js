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
      completed: []
    };

    this.handleCardDrop = this.handleCardDrop.bind(this);
  }

  componentDidMount() {
    const { terms, termIdx } = this.state;
    this.setState({ completed: terms[termIdx].completed });
  }

  handleCardDrop(word, slotRef) {
    console.log(word, slotRef);
    // console.log(this.state.completed);
    // this.setState({ termIdx: ++this.state.termIdx });
  }

  render() {
    const termIdx   = this.state.termIdx,
          termObj   = this.state.terms[termIdx],
          term      = termObj.term,
          def       = termObj.def,
          completed = termObj.completed,
          cards     = this.state.cards;

    return (
      <div className="board-wrapper">
        <div className="term-wrapper">
          <h2>{ term }</h2>
        </div>

        <div className="definition-wrapper">
          { def.map((word, i) => {
              return (
                <Slot key={ i } word={ word } completed={ completed[i] }/>
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
