## react-native-tableview 使用

众所周知，react-native 的 ListView 是使用 ScrollView 封装的，是完全没有重用机制的，iOS 配备了 UITableView，通过重用底层的 UIViews 实现了非常高性能的体验，相比较而言，ListView 的性能并没有那么好。

那么，很容易想到，我们可以自己动手将 iOS 原生的 UITableView 导出到 RN 使用。

Git 上已经有人实现了 UITableView 的 RN 封装，即今天要提到的主角 [react-native-tableview](https://github.com/aksonov/react-native-tableview)。

## 安装与链接

1. 安装
	
	* npm `npm install react-native-tableview --save` 
	* yarn `yarn add react-native-tableview`

2. 链接

	* `react-native link react-native-tableview`
	* 如果命令失败的，可以使用手动方式

3. 使用
	
	```
	import TableView from 'react-native-tableview'
	```
	
4. 手动链接
	* 打开 Xcode， 在工程目录下的 Libraries 选择添加文件。
	* 选择 ./node_modules/react-native-tableview/RNTableView.xcodeproj
	* 选择工程，在 Build Phases -> Link Binary With Libraries 添加 libRNTableView.a。
	* 在 Build Setting 中找到 Search Paths/Header Search Paths，添加 $(SRCROOT)/../node_modules/react-native-tableview (make sure it's recursive)。
	
## 使用

react-native-tableview 支持了 iOS UITableView 及 UITableViewCell 的几乎所有功能，`UITableView` 和 `UITableViewCell` 的基础属性都是支持的，这个看作者的文档即可。

`react-native-tableview` 支持两种方式的自定义 `Cell`:

* RNReactModuleCell
* RNCellView

### RNReactModuleCell

`RNReactModuleCell` 方式的自定义 Cell 实现了 UITableView 的重用功能

```objc
-(UITableViewCell*)setupReactModuleCell:(UITableView *)tableView data:(NSDictionary*)data indexPath:(NSIndexPath *)indexPath {
    RCTAssert(_bridge, @"Must set global bridge in AppDelegate, e.g. \n\
              #import <RNTableView/RNAppGlobals.h>\n\
              [[RNAppGlobals sharedInstance] setAppBridge:rootView.bridge]");
    RNReactModuleCell *cell = [tableView dequeueReusableCellWithIdentifier:_reactModuleCellReuseIndentifier];
    if (cell == nil) {
        cell = [[RNReactModuleCell alloc] initWithStyle:self.tableViewCellStyle reuseIdentifier:_reactModuleCellReuseIndentifier bridge: _bridge data:data indexPath:indexPath reactModule:_reactModuleForCell tableViewTag:self.reactTag];
    } else {
        [cell setUpAndConfigure:data bridge:_bridge indexPath:indexPath reactModule:_reactModuleForCell tableViewTag:self.reactTag];
    }
    return cell;
}
```

看 `RNReactModuleCell` 源码你会发现，他继承自 `UITableViewCell`，在每一个 cell 的内部是一个 `rootView`，拥有自己的 **moduleName**，所以在 RN 上使用时，需要注册这个 cell。假设这个自定义 cell 的名字叫 `TableViewExampleCell `。

OC 部分：

```objc
- (void)setUpAndConfigure:(NSDictionary*)data bridge:(RCTBridge*)bridge indexPath:(NSIndexPath*)indexPath reactModule:(NSString*)reactModule tableViewTag:(NSNumber*)reactTag {
    NSDictionary *props = [self toProps:data indexPath:indexPath reactTag:reactTag];
    if (_rootView == nil) {
        //Create the mini react app that will populate our cell. This will be called from cellForRowAtIndexPath
        _rootView = [[RCTRootView alloc] initWithBridge:bridge moduleName:reactModule initialProperties:props];
        [self.contentView addSubview:_rootView];
        _rootView.frame = self.contentView.frame;
        _rootView.autoresizingMask = UIViewAutoresizingFlexibleWidth |UIViewAutoresizingFlexibleHeight;
    } else {
        //Ask react to re-render us with new data
        _rootView.appProperties = props;
    }
    //The application will be unmounted in javascript when the cell/rootview is destroyed
}
``` 

JS 部分：

```js
AppRegistry.registerComponent('TableViewExampleCell', () => TableViewExampleCell);
```

在使用这种方式的时候，cell 的高度是需要自己计算出来的（cell 高度不确定的情况还是蛮多的），虽然现在 UITableView 已经能通过正确的约束自己计算出 cell 的高度，并不需要用户指定，但是显然这个优秀的功能用不到这里☹️。

### RNCellView

`RNCellView` 方式并不需要另外注册，RNCellView 只是一个普通的 view。这里还需要另外一个帮手：`RNTableViewCell`。RNTableViewCell 集成自 UITableViewCell，RNTableViewCell 与 RNCellView 相互引用，当 RNCellView 的高度发生变化的时候，通过弱引用当前 UITableView 刷新列表。

```js
import TableView from 'react-native-tableview';

const { Section, Item, Cell } = TableView;

...

render() {
	<TableView
        style={{ flex: 1}}
        allowsToggle
        allowsMultipleSelection
        tableViewStyle={TableView.Consts.Style.Grouped}
        tableViewCellStyle={TableView.Consts.CellStyle.Subtitle}
        onPress={(event: any) => console.log(event)}
        reactModuleForCell='TableViewExampleCell'
    >
        <Section label="Section 3" arrow={false}>
            <Cell componentHeight={80}>
                <View>
                    <Text>Cell 11</Text>
                    <Text>Cell 12</Text>
                    <Text>Cell 13</Text>
                    <Text>Cell 14</Text>
                    <Text>Cell 15</Text>
                    <Text>Cell 16</Text>
                    <Text>Cell 17</Text>
                </View>
            </Cell>
            <Cell componentHeight={80}><Text>Cell 2</Text></Cell>
            <Cell componentHeight={80}><Text>Cell 3</Text></Cell>
        </Section>
    </TableView>
}
```

通过这种方式自定义 cell，完全不用担心 cell 的高度怎么变化，在 RN 部分，通过 onLayout 方法，动态获取高度，然后在原生部分，实时刷新。

JS 部分：

```js
import React from 'react'
import { requireNativeComponent } from 'react-native'

const RNCellView = requireNativeComponent('RNCellView', null)

export default class TableViewCell extends React.Component {
  constructor(props) {
    super(props)

    this.state = { width: 0, height: 0 }
  }
  render() {
    return (
      <RNCellView
        onLayout={(event) => {
          this.setState(event.nativeEvent.layout)
        }}
        {...this.props}
        componentWidth={this.state.width}
        componentHeight={this.state.height}
      />
    )
  }
}
```

OC 部分：

```objc
- (void)setComponentHeight:(float)componentHeight {
    _componentHeight = componentHeight;
    if (componentHeight){
        [_tableView reloadData];
    }
}
```

RNCellView 没有使用重用：所有的 RNCellView 都被缓存在全局数组 _cells 里面，_cells 是一个二维数组，每个 section 对应一个数组，数组里面存放的是该 section 下面的 cell。

```objc
- (void)insertReactSubview:(UIView *)subview atIndex:(NSInteger)atIndex
{
    // will not insert because we don't need to draw them
    //   [super insertSubview:subview atIndex:atIndex];
    
    // just add them to registry
    if ([subview isKindOfClass:[RNCellView class]]){
        RNCellView *cellView = (RNCellView *)subview;
        cellView.tableView = self.tableView;
        while (cellView.section >= [_cells count]){
            [_cells addObject:[NSMutableArray array]];
        }
        [_cells[cellView.section] addObject:subview];
        if (cellView.section == [_sections count]-1 && cellView.row == [_sections[cellView.section][@"count"] integerValue]-1){
            [self.tableView reloadData];
        }
    } else ...
}
```

### 数据结构

最后来说下从 RN 端到 OC 端的数据传递。

JS 端的数据转换的核心代码在 TableView.js 文件。

```json
[{
	"customCells":false,
	"items":[{
			"arrow":true,
			"label":"label",
			"message":"message"
		},{
			"arrow":true,
			"height":100,
			"label":"label",
			"message":"message"
		}],
	"count":5
},{
		"customCells":false,
		"label":"Section 2",
		"items":[{
			"label":"Item 1",
			"arrow":false,
			"children":"Item 1"
		}, {
			"label":"Item 2",
			"arrow":false,
			"children":"Item 2"
		}],
	"count":3
}, {
	"customCells":true,
	"label":"Section 3",
	"items":[{
		"label":"Section 3",
		"arrow":false,
		"componentHeight":80
	}, {
		"label":"Section 3",
		"arrow":false,
		"componentHeight":80
	},{
		"label":"Section 3",
		"arrow":false,
		"componentHeight":80
	}],
	"count":6
}]
```

这个对应 TableView 的 sections 属性，注意 `customCells`，当他的值为 `true` 时就会使用 RNViewCell，即 TableView 的子视图类型为 `TableViewCell`，即上面使用 `<Cell></Cell>` 标签。

`Section` 和 `Item` 标签并不渲染，在他们的 `render` 方法里均 `return null`。
	
	