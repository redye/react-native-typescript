import React from 'react';

import {
    BaseComponent
} from 'ts-react-native-base';

import {
    View,
    Linking,
    StyleSheet
} from 'react-native';

import Button from 'react-native-button';
import { Actions } from 'react-native-router-flux';

export default class MessagePage extends BaseComponent {
    render() {
        return (
            <View style={styles.container}>
                <Button onPress={Actions['test']}>测试页面</Button>
                <Button onPress={() => {Actions['messageDetail']({messageId: 1234})}} containerStyle={{marginTop: 20}}>消息详情</Button>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ff0'
    }
});