import * as React from 'react';
import { View, Text, } from 'react-native';
export default class OrderDetailPage extends React.Component {
    // static propTypes = {
    //     orderId: PropTypes.string | PropTypes.number
    // }
    constructor(props) {
        super(props);
    }
    render() {
        return (React.createElement(View, { style: { flex: 1, justifyContent: "center", alignItems: 'center' } },
            React.createElement(Text, null,
                "\u8BA2\u5355\u8BE6\u60C5: ",
                this.props.orderId,
                " ",
                typeof this.props)));
    }
}
