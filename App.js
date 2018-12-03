/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';

import {
  HomePage,
  MessagePage,
  MinePage,
  TestPage,
  MessageDetailPage,
  OrderDetailPage,
  OrderListPage
} from 'ts-react-native-pages';

import {
  Configure
} from 'ts-react-native-common';

import {
  TabIcon
} from 'ts-react-native-components';

import { 
  Router, 
  Scene,
  Tabs,
  Stack, 
  Reducer
} from 'react-native-router-flux';

import backImage from './app/images/navigtionbar_back.png';
import { THEME_COLOR, TEXT_MAIN_COLOR } from 'ts-react-native-common';

getSceneStyle = () => ({
  backgroundColor: '#FFF',
  shadowRadius: 3,
  shadowOpacity: 1,
});

createReducer = (params) => {
  const defaultReducer = new Reducer(params);
  return (state, action) => {
    console.log('ACTION:', action);
    return defaultReducer(state, action);
  };
}

export default class App extends Component<{}> {
  render() {
    return (
      <Router 
        getSceneStyle={getSceneStyle}
        uriPrefix='weimob.com'
        createReducer={createReducer}
      >
        <Stack 
          navigationBarStyle={{ backgroundColor: THEME_COLOR }}
          backButtonImage={backImage}
          titleStyle={styles.titleStyle}
        >
          <Tabs
            key='tabbar'
            swipeEnabled={false}
            showLabel={true}
            tabBarStyle={styles.tabBarStyle}
            activeBackgroundColor="rgba(236, 236, 236, 1)"
            inactiveBackgroundColor="rgba(236, 236, 236, 1)"
            activeTintColor={THEME_COLOR}
            inactiveTintColor={TEXT_MAIN_COLOR}
            labelStyle={styles.labelStyle}
            hideNavBar
            initial
          >
            <Stack
              key="home_tab"
              title="home"
              tabBarLabel="首页"
              inactiveBackgroundColor="#FFF"
              activeBackgroundColor="#DDD"
              icon={TabIcon}
              initial
            >
              <Scene key="home" path="" component={HomePage} title="首页_scene" hideNavBar={false} />
            </Stack>

            <Stack
              key="message_tab"
              title="message"
              tabBarLabel="消息"
              icon={TabIcon}
            >
              <Scene key="message" component={MessagePage} title="消息_scene" hideNavBar={false} />
            </Stack>

            <Stack
              key="mine_tab"
              title="mine"
              tabBarLabel="我的"
              inactiveBackgroundColor="#FFF"
              activeBackgroundColor="#DDD"
              icon={TabIcon}
            >
              <Scene key="mine" component={MinePage} hideNavBar title="我的_scene" />
            </Stack>
          </Tabs>
          <Scene key="test" component={TestPage} title="测试页面"/>
          <Scene key="messageDetail" path="/message/detail/:messageId" component={MessageDetailPage} title="消息详情" />
          <Scene key="orderList" path="/order/list" component={OrderListPage} title="订单列表" />
          <Scene key="orderDetail" path="/order/list/:orderId" component={OrderDetailPage} title="订单详情" />
        </Stack>
      </Router>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  tabBarStyle: {
    backgroundColor: '#EEE',
  },
  tabBarSelectedItemStyle: {
    backgroundColor: '#DDD',
  },
  titleStyle: {
    color: '#FFF',
    alignSelf: 'center'
  },
  labelStyle:{
    fontSize: 15
  }
});
