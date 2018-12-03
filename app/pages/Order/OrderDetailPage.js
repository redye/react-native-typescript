import React from 'react';
import { View, Text, } from 'react-native';
import PropTypes from 'prop-types';
export default class OrderDetailPage extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (React.createElement(View, { style: { flex: 1, justifyContent: "center", alignItems: 'center' } },
            React.createElement(Text, null,
                "\u8BA2\u5355\u8BE6\u60C5: ",
                this.props.orderId)));
    }
}
OrderDetailPage.propTypes = {
    orderId: PropTypes.string | PropTypes.number
};
