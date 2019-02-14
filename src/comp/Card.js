import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Draggable from 'react-draggable';

class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      controlledPosition: { x: 0, y: 0 },
      zIndex: 1
    };
    this.dragStop = this.dragStop.bind(this);
    this.dragStart = this.dragStart.bind(this);
  }

  dragStart() {
    this.setState({ zIndex: 100 });
  }

  dragStop(e, position) {
    const { word } = this.props;
    const slotTarget = document.querySelector(`#${word}`),
          slots = document.querySelectorAll('.slot-wrapper'),
          card = ReactDOM.findDOMNode(this);

    let slotRef = null;
    for (let i = 0, len = slots.length; i < len; i++) {
      if (slots[i] === slotTarget) {
        slotRef = i;
      }
    }

    card.style.transition = 'transform .3s ease';

    if (slotTarget === null) {
      setTimeout(() => card.style.transition = 'initial', 300);
      return;
    }

    const slotTargetRect = slotTarget.getBoundingClientRect(),
          cardRect = card.getBoundingClientRect();

    let cardDistX = (cardRect.x - slotTargetRect.x),
        cardDistY = (cardRect.y - slotTargetRect.y);

    const xDir = cardDistX <= 0 ? 'pos' : 'neg',
          yDir = cardDistY <= 0 ? 'pos' : 'neg';

    cardDistX = Math.abs(cardDistX);
    cardDistY = Math.abs(cardDistY);

    if (cardDistX < slotTargetRect.width / 3 &&
      cardDistY < slotTargetRect.height / 2.5) {
          const lastX = position.lastX,
                lastY = position.lastY;
          const newX = xDir === 'pos' ? lastX + cardDistX : lastX - cardDistX,
                newY = yDir === 'pos' ? lastY + cardDistY : lastY - cardDistY;

          this.setState({
            controlledPosition: { x: newX, y: newY }
          });
    }
    setTimeout(() => card.style.transition = 'initial', 300);
    this.props.handleCardDrop(word, slotRef);
  }

  render() {
    const { word } = this.props;
    const { controlledPosition, zIndex } = this.state;

    return (
      <Draggable position={ controlledPosition }
                onStop={ this.dragStop }
                onStart={ this.dragStart }>
        <div className="card-wrapper" style={{ zIndex: zIndex }}>
          <p>{ word }</p>
        </div>
      </Draggable>
    );
  }
}

export default Card;
