import React, { Component } from 'react';

class Term extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { term } = this.props;

    return (
      <div className="term-wrapper">
        <h2>{ term }</h2>
      </div>
    )
  }
}

export default Term;
