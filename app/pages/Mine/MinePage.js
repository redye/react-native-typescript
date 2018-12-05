import React from 'react';

import {
    BaseComponent
} from 'ts-react-native-base';

import {
    View,
    Text
} from 'react-native';

import Button from 'react-native-button';

import {
    Actions
} from 'react-native-router-flux';

import {
    inject,
    observer
} from 'mobx-react';

@inject('userStore')
@observer
export default class MinePage extends BaseComponent {
    render() {
        return (
            <View style={{backgroundColor: '#fff', flex: 1, alignItems: 'center', justifyContent: 'center'}}>

                {
                    this.props.userStore.userInfo ? 
                        <View>
                            <View style={{flexDirection: 'row'}}><Text>手机号: </Text><Text>{this.props.userStore.userInfo.phone}</Text></View>
                            <View style={{marginTop: 20, flexDirection: 'row'}}><Text>密码: </Text><Text>{this.props.userStore.userInfo.password}</Text></View>
                        </View>
                    : null
                }

                <Button containerStyle={{marginTop: 40}} onPress={Actions['login']}>登录</Button>
            </View>
        );
    }
}