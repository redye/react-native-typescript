import * as React from 'react';

import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TextInputChangeEventData,
    NativeSyntheticEvent,
} from 'react-native';

import {
    inject,
    observer
} from 'mobx-react';

import {
    observable,
    action,
    computed
} from 'mobx';

import {
    Actions
} from 'react-native-router-flux';

class LoginStore {
    @observable phone: string = null;
    @observable password: string = null;

    constructor(user: User) {
        if (user) {
            this.phone = user.phone;
            this.password = user.password;
        }
    }  

    @action
    setPhone(phone: string) {
        this.phone = phone;
    }

    @action
    setPassword(password: string) {
        this.password = password;
    }

    @computed get isValid() {
        return this.phone && this.phone.length == 11 && this.password && this.password.length > 6;
    }
}

import Button from 'react-native-button';

@inject('userStore')
@observer
export default class LoginController extends React.Component<any> {
    loginStore: LoginStore = new LoginStore(this.props.userStore.userInfo);

    constructor(props: any) {
        super(props);
    }

    _onPhoneValueChange = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
        const text:string = e.nativeEvent.text;
        this.loginStore.setPhone(text);
    }

    _onPasswordValueChange = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
        const text:string = e.nativeEvent.text;
        this.loginStore.setPassword(text);
    }

    _onCommit = () => {
        if (this.loginStore.isValid) {
            // 调用登录接口，登录成功，保存用户信息
            this.props.userStore.updateUser({
                phone: this.loginStore.phone,
                password: this.loginStore.password
            }).then((response: any) => {
                Actions.pop();
            }).catch((error: any) => {
                console.log('保存用户信息失败 =>', error);
            });
        } else {
            console.log('用户信息填写错误');
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.inputView}>
                    <Text style={styles.inputLabel}>手机号码：</Text>
                    <TextInput 
                        style={styles.inputField} 
                        keyboardType='number-pad' 
                        maxLength={11}
                        placeholder='请输入手机号'
                        onChange={this._onPhoneValueChange}
                        value={this.loginStore.phone}
                    ></TextInput>
                </View>

                <View style={[styles.inputView, {marginTop: 20}]}>
                    <Text style={styles.inputLabel}>密码：</Text>
                    <TextInput 
                        style={styles.inputField}
                        secureTextEntry={true}
                        placeholder='请输入密码'
                        onChange={this._onPasswordValueChange}
                        value={this.loginStore.password}
                    ></TextInput>
                </View>

                <Button containerStyle={{marginTop: 40}} onPress={this._onCommit}>提交</Button>
            </View>
        );
    }
}

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