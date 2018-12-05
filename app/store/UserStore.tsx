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
        this.user = null;
        StorageUtil.clear(userInfoKey);
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

    // get report() {
    //     if (this.user === null) {
    //         return `<None>`
    //     }
    //     return this.user;
    // }
}

const userStore = new UserStore();
userStore.readUser();

export default userStore;