import React from "react";
import ReactDOM from "react-dom";
import List from 'react-virtualized/dist/commonjs/List';
import CellMeasurer from 'react-virtualized/dist/commonjs/CellMeasurer'
import CellMeasurerCache from 'react-virtualized/dist/commonjs/CellMeasurer/CellMeasurerCache'

const app = document.getElementById('content');

class Tile extends React.Component {
    state = {
        clicked: false
    };

    onClick() {
        this.props.switchClickTo(!this.props.clicked)
    }

    render() {
        console.log("render")
        let color;
        if (this.props.clicked) {
            color = this.props.value % 2 == 0 ? "green" : "lightgreen";
        } else {
            color = this.props.value % 2 == 0 ? "lightgray" : "white";
        }

        const height = this.props.clicked ? "200px" : "30px"

        const style = {
            backgroundColor: color,
            paddingLeft: "40px",
            height: height,
            lineHeight: height
        }
        return (
            <div style={style} onClick={this.onClick.bind(this)}>
                {this.props.value}
            </div>
        )
    }
}

class VirtualList extends React.Component {

    constructor(props) {
        super(props);
        this.cache = new CellMeasurerCache({
            fixedWidth: true,
            minHeight: 30
        })

        var data = [];
        const itemCount = 5000;
        for (var i = 0; i < itemCount; i++) {
            data.push({ value: i, clicked: false });
        }

        this.state = {
            data: data
        }
    }

    render() {
        return (
            <div>
                <List
                    ref={(input) => { this.virtualizedCheckpointList = input }}
                    deferredMeasurementCache={this.cache}
                    height={600}
                    overscanRowCount={10}
                    noRowsRenderer={this.noRowsRenderer}
                    rowCount={this.state.data.length}
                    rowHeight={this.cache.rowHeight}
                    rowRenderer={this.rowRenderer.bind(this)}
                    width={400}
                />

            </div>
        );
    }

    switchClickTo(index, clicked) {
        var copy = this.state.data.slice()
        copy[index].clicked = clicked;
        this.setState({
            data: copy
        })

        this.cache.clearAll();
        this.virtualizedCheckpointList.recomputeRowHeights();
    }

    rowRenderer({ index, isScrolling, key, parent, style }) {

        const item = this.state.data[index];

        return (
            <CellMeasurer cache={this.cache} columnIndex={0} key={key} rowIndex={index} parent={parent}>
                <div style={style}>
                    <Tile value={item.value} clicked={item.clicked} switchClickTo={(value) => { this.switchClickTo(index, value) }}></Tile>
                </div>
            </CellMeasurer >
        )
    }
}



class App extends React.Component {
    render() {
        return (
            <div>
                <h1>Virtual List Scroll Jumps</h1>
                <span>Click the rows to expand them.</span>
                <ol>
                    <li>Scroll, so that an expanded row is half out of sight.</li>
                    <li>Click the row beneath it.</li>
                    <li>Now the expanded rows are both not seen.</li>
                    <li>Scroll a tiny bit with your scrolling wheel -> The scroll position is right where it should have been right after expanding.</li>
                </ol>
                <VirtualList></VirtualList>
            </div>
        );
    }
};

ReactDOM.render(
    <App>
    </App>, app
);


