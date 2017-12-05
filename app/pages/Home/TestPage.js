import React from 'react';

import {
    BaseComponent
} from 'ts-react-native-base';

import {
    View,
    StyleSheet
} from 'react-native';

import Button from 'react-native-button';
import { Actions } from 'react-native-router-flux';

export default class TestPage extends BaseComponent {
    render() {
        return (
            <View style={styles.container}>
                <Button onPress={Actions.pop}>返回</Button>
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