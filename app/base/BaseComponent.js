import React, { PureComponent } from 'react';

import { NavBarBuild } from 'react-native-tab-navigator';

export default class BaseComponent extends PureComponent {
    constructor(props) {
        super(props);
    }

    navBarBuilder = () => {
        return new NavBarBuilder(this, NAVIGATION_BAR_HEIGHT);
    }
}