import React from 'react';

import {
    BaseComponent
} from 'ts-react-native-base';

import {
    View
} from 'react-native';

import Button from 'react-native-button';

import {
    Actions
} from 'react-native-router-flux';

import {
    inject
} from 'mobx-react';

@inject('userStore')
export default class MinePage extends BaseComponent {
    render() {
        return (
            <View style={{backgroundColor: '#fff', flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Button onPress={() => {
                    if (this.props.userStore.isLogin) {
                    } else {
                        Actions['login']();
                    }
                }}>登录</Button>
            </View>
        );
    }
}