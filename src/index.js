import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Tab from './Tab';
import './style.css'
import './palette.css'

class Tabs extends Component {
  render() {
    const { tabs } = this.props;
    return (
      <div className="react-tabs-container">
        {tabs.map((tab, i) => (
          <Tab
            key={tab.id}
            index={i}
            id={tab.id}
            content={tab.content}
            moveTab={this.props.moveTab}
            selectTab={this.props.selectTab}
            closeTab = {this.props.closeTab}
            active={tab.active}
          />
        ))}
        <div className="react-tabs-child">
            {React.Children.toArray(this.props.children)}
        </div>
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(Tabs)
