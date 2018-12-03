import React from 'react';

import {
    View,
    Text,
} from 'react-native';

export default class OrderDetailPage extends React.Component {
    render () {
        return (
            <View style={{flex: 1, justifyContent: "center", alignItems: 'center'}}>
                <Text>订单详情</Text>
            </View>
        );
    }
}