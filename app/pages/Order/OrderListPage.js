import * as React from 'react';
import { View, Text } from 'react-native';
import TableView from 'react-native-tableview';
const { Section, Item, Cell } = TableView;
export default class OrderListPage extends React.Component {
    render() {
        return (React.createElement(View, { style: { flex: 1 } },
            React.createElement(TableView, { style: { flex: 1 }, allowsToggle: true, allowsMultipleSelection: true, tableViewStyle: TableView.Consts.Style.Grouped, tableViewCellStyle: TableView.Consts.CellStyle.Subtitle, onPress: (event) => console.log(event), reactModuleForCell: 'TableViewExampleCell' },
                React.createElement(Section, { arrow: true },
                    React.createElement(Item, { label: 'label', message: 'message' }),
                    React.createElement(Item, { height: 100, label: 'label', message: 'message' }),
                    React.createElement(Item, { label: 'label', message: 'message' }),
                    React.createElement(Item, { label: 'label', message: 'message' }),
                    React.createElement(Item, { label: 'label', message: 'message' })),
                React.createElement(Section, { label: "Section 2", arrow: false },
                    React.createElement(Item, null, "Item 1"),
                    React.createElement(Item, null, "Item 2"),
                    React.createElement(Item, null, "Item 3")),
                React.createElement(Section, { label: "Section 3", arrow: false },
                    React.createElement(Cell, { componentHeight: 80 },
                        React.createElement(View, null,
                            React.createElement(Text, null, "Cell 11"),
                            React.createElement(Text, null, "Cell 12"),
                            React.createElement(Text, null, "Cell 13"),
                            React.createElement(Text, null, "Cell 14"),
                            React.createElement(Text, null, "Cell 15"),
                            React.createElement(Text, null, "Cell 16"),
                            React.createElement(Text, null, "Cell 17"))),
                    React.createElement(Cell, { componentHeight: 80 },
                        React.createElement(Text, null, "Cell 2")),
                    React.createElement(Cell, { componentHeight: 80 },
                        React.createElement(Text, null, "Cell 3"))))));
    }
}
