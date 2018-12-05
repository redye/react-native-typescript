import React from 'react';

import {
    WebView
} from 'react-native';

export default class WebController extends React.Component {
    render() {
        return (
            <WebView
                // source={{uri: 'https://github.com/facebook/react-native'}}
                originWhitelist={['*']}
                source={{ html: `
                    <a href='http://www.baidu.com'>百度</a>

                    <a href='tspratice://weimob.com/order/list/:242334'>测试</a>
                ` }}
            />
        )
    }
}