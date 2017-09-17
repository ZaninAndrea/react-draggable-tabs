import React, {Component} from 'react';
import update from 'react/lib/update';
import Tabs from "react-draggable-tabs"

class App extends Component {
    constructor(props) {
        super(props)
        this.moveTab = this.moveTab.bind(this);
        this.selectTab = this.selectTab.bind(this);
        this.closedTab = this.closedTab.bind(this);
        this.state = {
            tabs: [
                {
                    id: 1,
                    content: "Cute Cat",
                    active: true,
                    display: <img src="http://memecrunch.com/meme/RFHY/cute-cat/image.png" alt="cute cat" width="500px"/>
                },
                {
                    id: 2,
                    content: <span><i className="fa fa-paw" aria-hidden="true"></i> Cute Dog</span>,
                    display: <img src="http://slappedham.com/wp-content/uploads/2014/06/Cute-White-Dog.jpg" alt="cute dog" width="500px"/>
                },
                {
                    id: 3,
                    content: 'Cute Duck',
                    display: <iframe title="DuckDuckGo" src="https://duckduckgo.com/"  style={{border:"0",margin:"50px", width:"500px", height:"800px"}}/>
                },
            ]
        };
    }

    moveTab(dragIndex, hoverIndex) {
        const {tabs} = this.state;
        const dragTab = tabs[dragIndex];

        this.setState(update(this.state, {
            tabs: {
                $splice: [
                    [dragIndex, 1],
                    [hoverIndex, 0, dragTab]
                ]
            }
        }));
    }

    selectTab(selectedIndex, selectedID) {
        this.setState((state, props) => {
            const newTabs = state.tabs.map(tab => ({
                ...tab,
                active: tab.id === selectedID
            }))
            return {tabs: newTabs}
        })
    }

    closedTab(removedIndex, removedID) {
        this.setState((state, props) => {
            let newTabs = [...state.tabs]
            newTabs.splice(removedIndex, 1)

            if (state.tabs[removedIndex].active && newTabs.length !== 0) { // automatically select another tab if needed
                const newActive = removedIndex === 0
                    ? 0
                    : removedIndex - 1
                newTabs[newActive].active = true;
            }

            return {tabs: newTabs}
        })
    }

    render() {
        const activeTab = this.state.tabs.filter(tab => tab.active === true)
        return (
            <div>
                <Tabs moveTab={this.moveTab} selectTab={this.selectTab} closeTab={this.closedTab} tabs={this.state.tabs}/>
                {activeTab.length !== 0
                    ? activeTab[0].display
                    : ""}
            </div>
        );
    }
}

export default  App
