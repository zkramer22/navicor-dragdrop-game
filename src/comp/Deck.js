import React, { Component } from 'react';
import Card from './Card.js';

class Deck extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { cards } = this.props;

    return (
      <div className="deck-wrapper">
        { cards.map((card, i) => {
            return (
              <Card key={ i } word={ card.word }/>
            )
          })
        }
      </div>
    )
  }
}

export default Deck;
