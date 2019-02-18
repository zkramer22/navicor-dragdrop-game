import React, { Component } from 'react';

class Slot extends Component {
  render() {
    const { word } = this.props;

    return (
      <div className="slot-wrapper" id={ word }>
      </div>
    );
  }
}

export default Slot;
