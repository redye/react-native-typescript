import * as React from 'react';

import {
    View,
    Text,
    TouchableOpacity
} from 'react-native';

import { Actions } from 'react-native-router-flux';

import Button from 'react-native-button';

import TableView from 'react-native-tableview';

const { Section, Item, Cell } = TableView;

export default class OrderListPage extends React.Component {
    render () {
        return (
            <View style={{flex: 1}}>
                <TableView
                    style={{ flex: 1}}
                    allowsToggle
                    allowsMultipleSelection
                    tableViewStyle={TableView.Consts.Style.Grouped}
                    tableViewCellStyle={TableView.Consts.CellStyle.Subtitle}
                    onPress={(event: any) => console.log(event)}
                    reactModuleForCell='TableViewExampleCell'
                >
                    {/* <Section label="Section 1" arrow> */}
                    <Section arrow>
                        {/* <Item value="1" detail="Detail1">Item 1</Item>
                        <Item value="2">Item 2</Item>
                        <Item>Item 3</Item> */}

                        <Item
                            label='label'
                            message='message'
                        />
                        <Item
                            height={100}
                            label='label'
                            message='message'
                        />
                        <Item
                            label='label'
                            message='message'
                        />
                        <Item
                            label='label'
                            message='message'
                        />
                        <Item
                            label='label'
                            message='message'
                        />
                    </Section>

                    <Section label="Section 2" arrow={false}>
                        <Item>Item 1</Item>
                        <Item>Item 2</Item>
                        <Item>Item 3</Item>
                    </Section>

                    <Section label="Section 3" arrow={false}>
                        <Cell componentHeight={80}>
                            <View>
                                <Text>Cell 11</Text>
                                <Text>Cell 12</Text>
                                <Text>Cell 13</Text>
                                <Text>Cell 14</Text>
                                <Text>Cell 15</Text>
                                <Text>Cell 16</Text>
                                <Text>Cell 17</Text>
                            </View>
                        </Cell>
                        <Cell componentHeight={80}><Text>Cell 2</Text></Cell>
                        <Cell componentHeight={80}><Text>Cell 3</Text></Cell>
                    </Section>
                </TableView>
            </View>
        );
    }
}