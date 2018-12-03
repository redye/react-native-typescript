import {
    Platform
} from 'react-native';
import Dimensions from 'Dimensions';

/**
 * 是否是 iPhoneX
 */
export const IS_PHONE_X = Platform.select({android: false, ios: Dimensions.get('window').height == 812 || Dimensions.get('window').height == 896 ? true : false});

/**
 * 导航栏高度
 */
export const NAVIGATION_BAR_HEIGHT = Platform.select({android: 54, ios:IS_PHONE_X ? 88 : 64});

/**
 * 底部导航高度
 */
export const TAB_BAR_HEIGHT = 54;

/**
 * 主题色
 */
export const THEME_COLOR = '#FE8D1D';

/**
 * 文字颜色
 */
export const TEXT_MAIN_COLOR = '#333';

/**
 * 屏幕宽度
 */
export const SCREEN_WIDTH = Dimensions.get('window').width;

/**
 * 屏幕高度
 */
export const SCREEN_HEIGHT = Dimensions.get('window').height;