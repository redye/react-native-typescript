import React from 'react';
import { View, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Button from 'react-native-button';
export default class OrderListPage extends React.Component {
    render() {
        return (React.createElement(View, { style: { flex: 1, justifyContent: "center", alignItems: 'center' } },
            React.createElement(Text, null, "\u8BA2\u5355\u5217\u8868"),
            React.createElement(Button, { style: { marginTop: 20 }, onPress: Actions['orderDetail'] }, "\u4E00\u6761\u8BB0\u5F55")));
    }
}