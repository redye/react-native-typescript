import {
    observable,
    action,
    autorun,
    computed,
    configure
} from 'mobx';
configure({ isolateGlobalState: true });

import {
    StorageUtil
} from 'ts-react-native-common';

const userInfoKey = 'userInfo';

class UserStore {
    
    @observable user:User = null;

    constructor() {
        autorun((report: any) => {
            console.log('report ==> ', report);
        });
    }
    
    @action
    updateUser(user: User) {
        this.user = user;
        return StorageUtil.save(userInfoKey, this.user);
    }

    @action
    clearUser() {
        StorageUtil.clear(userInfoKey).then((response: any) => {
            this.user = null;
        }).catch();
    }

    @action
    readUser() {
        // 从本地读取用户信息
        StorageUtil.load(userInfoKey).then((response: any) => {
            this.user = response;
        }).catch((error: any) => {
            console.log('读取用户信息失败');
        });
    }

    @computed get userInfo() {
        return this.user;
    }

    @computed get isLogin() {
        return this.user && this.user !== undefined && this.user !== null;
    }
}

const userStore = new UserStore();
userStore.readUser();

export default userStore;