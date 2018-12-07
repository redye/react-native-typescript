import React from 'react';

import {
    BaseComponent
} from 'ts-react-native-base';

import {
    View,
    StyleSheet,
    Linking
} from 'react-native';

import Button from 'react-native-button';
import { Actions } from 'react-native-router-flux';

export default class HomePage extends BaseComponent {
    render() {
        return (
            <View style={styles.container}>
                <Button onPress={Actions['test']}>测试页面</Button>
                <Button style={{marginTop: 20}} onPress={Actions['orderList']}>订单页面</Button>

                <Button style={{marginTop: 20}} onPress={Actions['web']}>Web 页面</Button>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});