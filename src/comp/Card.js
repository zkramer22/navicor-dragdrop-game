import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Draggable from 'react-draggable';

class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      controlledPosition: { x: 0, y: 0 },
      zIndex: 1,
      transition: 'unset',
      border: '1px solid',
      pointerEvents: 'auto'
    };
    this.dragStop = this.dragStop.bind(this);
    this.dragStart = this.dragStart.bind(this);
  }

  dragStart() {
    this.setState({ zIndex: 100 });
  }

  handleIncorrectCard() {
    this.setState({ border: '1px solid red '});
    setTimeout(() => {
      this.setState({ border: '1px solid', transition: 'initial' });
    }, 300);
  }

  findPositions(slotTarget, card) {
    const slotTargetRect = slotTarget.getBoundingClientRect(),
          cardRect = card.getBoundingClientRect();
    return [slotTargetRect, cardRect];
  }

  findDistances(cardRect, slotTargetRect) {
    let cardDistX = (cardRect.x - slotTargetRect.x),
        cardDistY = (cardRect.y - slotTargetRect.y);

    const xDir = cardDistX <= 0 ? 'pos' : 'neg',
          yDir = cardDistY <= 0 ? 'pos' : 'neg';

    cardDistX = Math.abs(cardDistX);
    cardDistY = Math.abs(cardDistY);

    return [cardDistX, cardDistY, xDir, yDir];
  }

  getNewPositions(position, xDir, yDir, cardDistX, cardDistY) {
    const lastX = position.lastX,
          lastY = position.lastY;
    const newX = xDir === 'pos' ? lastX + cardDistX : lastX - cardDistX,
          newY = yDir === 'pos' ? lastY + cardDistY : lastY - cardDistY;

    return [newX, newY];
  }

  dragStop(e, position) {
    const { word } = this.props;
    const slotTarget = document.querySelector(`#${word}`),
          card = ReactDOM.findDOMNode(this);

    this.setState({ transition: 'transform .3s ease, border .1s linear' });

    if (slotTarget === null) {
      this.handleIncorrectCard();
      return;
    }

    const [slotTargetRect, cardRect] = this.findPositions(slotTarget, card);
    const [cardDistX, cardDistY, xDir, yDir] = this.findDistances(cardRect, slotTargetRect);

    if (cardDistX < slotTargetRect.width / 3 &&
      cardDistY < slotTargetRect.height / 2.5) {
          const [newX, newY] = this.getNewPositions(position, xDir, yDir, cardDistX, cardDistY);

          this.setState({
            controlledPosition: { x: newX, y: newY },
            pointerEvents: 'none',
            border: '1px solid lightgreen'
          });

          this.props.handleCardDrop(this, word);
    }
    else {
      this.handleIncorrectCard();
    }
  }

  render() {
    const { word } = this.props;
    const { controlledPosition, zIndex,
            transition, border, pointerEvents } = this.state;

    return (
      <Draggable position={ controlledPosition }
                onStop={ this.dragStop }
                onStart={ this.dragStart }>
        <div className="card-wrapper"
        style={{ zIndex: zIndex, transition: transition, border: border, pointerEvents: pointerEvents }}>
          <p>{ word }</p>
        </div>
      </Draggable>
    );
  }
}

export default Card;
