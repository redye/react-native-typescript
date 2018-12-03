import React from 'react';

import {
    View,
    Text,
    TouchableOpacity
} from 'react-native';

import { Actions } from 'react-native-router-flux';

import Button from 'react-native-button';

export default class OrderListPage extends React.Component {
    render () {
        return (
            <View style={{flex: 1, justifyContent: "center", alignItems: 'center'}}>
                <Text>订单列表</Text>
                <Button style={{marginTop: 20}} onPress={Actions['orderDetail']}>一条记录</Button>
            </View>
        );
    }
}