import React from 'react';

const Slot = props => {
  const { word } = props;
  return (
    <div className="slot-wrapper" id={ word }>
    </div>
  );
}

export default Slot;
