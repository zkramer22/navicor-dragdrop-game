import React, { Component } from 'react';
import Draggable from 'react-draggable';

class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const id = '#card-' + this.props.num;
    // Draggable.create(id, {
    //   type: 'x,y',
    //   bounds: '.board-wrapper',
    //   onDragEnd: () => {
    //     this.dragEnd(this.props.word)
    //   }
    // });
  }

  dragEnd(word) {
    console.log(word);
    if (this.hitTest(`#${word}`)) {
      console.log('yes!');
    }
  }

  render() {
    const { word } = this.props;
    const id = 'card-' + this.props.num;

    // console.log(id);

    return (
      <Draggable>
        <div className="card-wrapper" id={ id }>
          <p>{ word }</p>
        </div>
      </Draggable>
    );
  }
}

export default Card;
