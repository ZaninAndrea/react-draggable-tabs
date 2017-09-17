import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import { DragSource, DropTarget } from 'react-dnd';
import ItemTypes from './ItemTypes';

const tabSource = {
  beginDrag(props) {
    return {
      id: props.id,
      index: props.index,
    };
  },
};

const tabTarget = {
  hover(props, monitor, component) {
    const dragIndex = monitor.getItem().index;
    const hoverIndex = props.index;

    // Don't replace items with themselves
    if (dragIndex === hoverIndex) {
      return;
    }

    // Determine rectangle on screen
    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();

    // Get vertical middle
    const hoverMiddleX = (hoverBoundingRect.right - hoverBoundingRect.left) / 2;

    // Determine mouse position
    const clientOffset = monitor.getClientOffset();

    // Get pixels to the top
    const hoverClientX = clientOffset.x - hoverBoundingRect.left;

    // Only perform the move when the mouse has crossed half of the items height
    // When dragging downwards, only move when the cursor is below 50%
    // When dragging upwards, only move when the cursor is above 50%

    // Dragging downwards
    if (dragIndex < hoverIndex && hoverClientX < hoverMiddleX) {
      return;
    }

    // Dragging upwards
    if (dragIndex > hoverIndex && hoverClientX > hoverMiddleX) {
      return;
    }

    // Time to actually perform the action
    props.moveTab(dragIndex, hoverIndex);

    // Note: we're mutating the monitor item here!
    // Generally it's better to avoid mutations,
    // but it's good here for the sake of performance
    // to avoid expensive index searches.
    monitor.getItem().index = hoverIndex;
  },
};

class Tab extends Component {
  render() {
    const { content, isDragging, connectDragSource, connectDropTarget } = this.props;

    const onClose = (e) => {
        e.stopPropagation()
        this.props.closeTab(this.props.index, this.props.id)
    }

    const onClick = (e) => {
        if( e.button == 0 ) {
            e.preventDefault();
            this.props.selectTab(this.props.index, this.props.id)
        }else if (e.button == 1){
            onClose(e)
        }
    }

    return connectDragSource(connectDropTarget(
      <div className={this.props.active ? "react-tabs-tab react-tabs-active" : "react-tabs-tab"} onMouseUp={onClick}>
        <div className="react-tabs-tab-content" >{content}</div>
        <div className="react-tabs-tab-close" onClick={onClose}>×</div>
    </div>,
    ));
  }
}

export default DropTarget(ItemTypes.CARD, tabTarget, connect => ({
  connectDropTarget: connect.dropTarget(),
}))(DragSource(ItemTypes.CARD, tabSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
}))(Tab))
