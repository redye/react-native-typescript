import React from 'react';

import {
    BaseComponent
} from 'ts-react-native-base';

import {
    View,
    Text,
    StyleSheet
} from 'react-native';

import Button from 'react-native-button';
import { Actions } from 'react-native-router-flux';

export default class MessagePage extends BaseComponent {
    render() {
        return (
            <View style={styles.container}>
                <Text style={{marginBottom: 20}}>{this.props.messageId}</Text>
                <Button onPress={Actions['test']}>测试页面</Button>
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