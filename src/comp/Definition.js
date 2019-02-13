import React, { Component } from 'react';
import Slot from './Slot.js';

class Definition extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
  }

  render() {
    const { def } = this.props;

    return (
      <div className="definition-wrapper">
        { def.map((word, i) => {
            return (
              <Slot key={ i } word={ word }/>
            )
          })
        }
      </div>
    )
  }
}

export default Definition;
