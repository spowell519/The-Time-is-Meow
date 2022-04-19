// individual element in ItemGrid

import React from 'react';
import { connect } from 'react-redux';

class ItemPreview extends React.PureComponent {
  constructor(props) {
    super(props);
  }
  render() {
    const item = this.props.item || {};
    return (
      <div className="item-preview">
        <div className="quick-add">{item.price}<a href="" onClick="">+</a></div>
        <div className="thumbnail"><img src={item.imageURL} /></div>
        <div className="info"><h4>{item.title}</h4></div>
      </div>
    )
  }
}

export default ItemPreview;
