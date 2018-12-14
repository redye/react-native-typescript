import * as React from 'react';
import { View, Text, } from 'react-native';
export default class TableViewExampleCell extends React.Component {
    render() {
        var style = { borderColor: '#aaaaaa' };
        // Fill the full native table cell height.
        style.flex = 1;
        // All Item props get passed to this cell inside this.props.data. Use them to control the rendering, for example background color:
        if (this.props.data.backgroundColor !== undefined) {
            style.backgroundColor = this.props.data.backgroundColor;
        }
        return (React.createElement(View, { style: style },
            React.createElement(Text, null,
                "section:",
                this.props.section,
                ",row:",
                this.props.row,
                ",label:",
                this.props.data.label),
            React.createElement(Text, null,
                " message:",
                this.props.data.message)));
    }
}
