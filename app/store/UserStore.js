var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { observable, action, autorun, computed, configure } from 'mobx';
configure({ isolateGlobalState: true });
import { StorageUtil } from 'ts-react-native-common';
const userInfoKey = 'userInfo';
class UserStore {
    constructor() {
        this.user = null;
        autorun((report) => {
            console.log('report ==> ', report);
        });
    }
    updateUser(user) {
        this.user = user;
        return StorageUtil.save(userInfoKey, this.user);
    }
    clearUser() {
        this.user = null;
        StorageUtil.clear(userInfoKey);
    }
    readUser() {
        // 从本地读取用户信息
        StorageUtil.load(userInfoKey).then((response) => {
            this.user = response;
        }).catch((error) => {
            console.log('读取用户信息失败');
        });
    }
    get userInfo() {
        return this.user;
    }
    get isLogin() {
        return this.user && this.user !== undefined && this.user !== null;
    }
}
__decorate([
    observable
], UserStore.prototype, "user", void 0);
__decorate([
    action
], UserStore.prototype, "updateUser", null);
__decorate([
    action
], UserStore.prototype, "clearUser", null);
__decorate([
    action
], UserStore.prototype, "readUser", null);
__decorate([
    computed
], UserStore.prototype, "userInfo", null);
__decorate([
    computed
], UserStore.prototype, "isLogin", null);
const userStore = new UserStore();
userStore.readUser();
export default userStore;
