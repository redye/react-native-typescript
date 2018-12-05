import * as React from 'react';

import {
    View,
    Text,
} from 'react-native';

import PropTypes from 'prop-types';
import { any } from 'prop-types';

interface OrderDetailProps {
    orderId: string | number
}


export default class OrderDetailPage extends React.Component<OrderDetailProps, any> {

    // static propTypes = {
    //     orderId: PropTypes.string | PropTypes.number
    // }

    constructor(props: any) {
        super(props);
    }

    render () {
        return (
            <View style={{flex: 1, justifyContent: "center", alignItems: 'center'}}>
                <Text>订单详情: {this.props.orderId} {typeof this.props}</Text>
            </View>
        );
    }
}