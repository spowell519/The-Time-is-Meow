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
        <div class="item-preview">
          <div class="quick-add">${item.price}<a href="" onclick="">+</a></div>
          <div class="thumbnail"><img src={item.imageURL} /></div>
          <div class="info"><h4>{item.title}</h4></div>
        </div>
      )
  }
}

export default ItemPreview;
