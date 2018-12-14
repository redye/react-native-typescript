import * as React from 'react';

import {
    View,
    Text,
} from 'react-native';

export default class TableViewExampleCell extends React.Component<any> {
    render() {
      var style:any = { borderColor: '#aaaaaa'}
  
      // Fill the full native table cell height.
      style.flex = 1;
  
      // All Item props get passed to this cell inside this.props.data. Use them to control the rendering, for example background color:
      if (this.props.data.backgroundColor !== undefined) {
        style.backgroundColor = this.props.data.backgroundColor
      }
  
      return (
        <View style={style}>
          <Text>
            section:{this.props.section},row:{this.props.row},label:{this.props.data.label}
          </Text>
          <Text> message:{this.props.data.message}</Text>
        </View>
      )
    }
  }