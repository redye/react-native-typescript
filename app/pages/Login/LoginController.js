var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import * as React from 'react';
import { View, Text, StyleSheet, TextInput, } from 'react-native';
import { inject, observer } from 'mobx-react';
import { observable, action, computed } from 'mobx';
import { Actions } from 'react-native-router-flux';
class LoginStore {
    constructor() {
        this.phone = null;
        this.password = null;
    }
    setPhone(phone) {
        this.phone = phone;
    }
    setPassword(password) {
        this.password = password;
    }
    get isValid() {
        return this.phone && this.phone.length == 11 && this.password && this.password.length > 6;
    }
}
__decorate([
    observable
], LoginStore.prototype, "phone", void 0);
__decorate([
    observable
], LoginStore.prototype, "password", void 0);
__decorate([
    action
], LoginStore.prototype, "setPhone", null);
__decorate([
    action
], LoginStore.prototype, "setPassword", null);
__decorate([
    computed
], LoginStore.prototype, "isValid", null);
import Button from 'react-native-button';
let LoginController = class LoginController extends React.Component {
    constructor(props) {
        super(props);
        this.loginStore = new LoginStore();
        this._onPhoneValueChange = (e) => {
            const text = e.nativeEvent.text;
            this.loginStore.setPhone(text);
        };
        this._onPasswordValueChange = (e) => {
            const text = e.nativeEvent.text;
            this.loginStore.setPassword(text);
        };
        this._onCommit = () => {
            if (this.loginStore.isValid) {
                // 调用登录接口，登录成功，保存用户信息
                this.props.userStore.updateUser({
                    phone: this.loginStore.phone,
                    password: this.loginStore.password
                }).then((response) => {
                    Actions.pop();
                }).catch((error) => {
                    console.log('保存用户信息失败 =>', error);
                });
            }
            else {
                console.log('用户信息填写错误');
            }
        };
    }
    render() {
        return (React.createElement(View, { style: styles.container },
            React.createElement(View, { style: styles.inputView },
                React.createElement(Text, { style: styles.inputLabel }, "\u624B\u673A\u53F7\u7801\uFF1A"),
                React.createElement(TextInput, { style: styles.inputField, keyboardType: 'number-pad', maxLength: 11, placeholder: '\u8BF7\u8F93\u5165\u624B\u673A\u53F7', onChange: this._onPhoneValueChange, value: this.loginStore.phone })),
            React.createElement(View, { style: [styles.inputView, { marginTop: 20 }] },
                React.createElement(Text, { style: styles.inputLabel }, "\u5BC6\u7801\uFF1A"),
                React.createElement(TextInput, { style: styles.inputField, secureTextEntry: true, placeholder: '\u8BF7\u8F93\u5165\u5BC6\u7801', onChange: this._onPasswordValueChange, value: this.loginStore.password })),
            React.createElement(Button, { containerStyle: { marginTop: 40 }, onPress: this._onCommit }, "\u63D0\u4EA4")));
    }
};
LoginController = __decorate([
    inject('userStore'),
    observer
], LoginController);
export default LoginController;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    inputView: {
        height: 44,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#eee',
        paddingHorizontal: 15,
    },
    inputLabel: {
        width: 80,
    },
    inputField: {
        flex: 1,
    }
});
