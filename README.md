# react-native-typescript

使用 typescript 开发 react-native 项目。

* [添加依赖](#dependencies)
* [tsconfig.json 配置](#tsconfig)
* [代码自动编译](#auto-compiler)
* [在使用过程中遇到的问题](#questions)
	* [导入某个模块](#question-import)
	* [构造函数](#question-constructor)
	* [使用属性](#question-props)

## <span id="dependencies">添加依赖</span>

```js
npm install -D typescript # 安装当前最新版本，当然了你也可以指定版本
npm i -D @types/react @types/react-native # 这两个依赖是将 react 和 react-native 加入 types 中来， 只用 node_modules/@types 文件夹及他的子文件夹下所有的包是可见的

```

## <span id="tsconfig">tsconfig.json 配置</span>

```json
{
	"compileOnSave": true,
  	"compilerOptions": {
	    "target": "es6",
	    "allowJs": true,
	    "jsx": "react",
	    "outDir": "dist", 
	    "baseUrl": "./",
	    "sourceMap": false,
	    "noImplicitAny": true,
	    "allowSyntheticDefaultImports": true
  },
  "include": [ /* 需要被编译的文件或文件夹 */
	    "typings/**/*.d.ts",
	    "app/**/*.ts",
	    "app/**/*.tsx"
  ],
  "exclude": [ /* 表示不要被编译的文件或文件夹 */
	    "node_modules",
	    "ios",
	    "android",
  ]
}
```

注意上面的 `outDir` 配置，这里有一个疑问：

按照惯例，outDir 是会重新指定，但是这里有个问题是，这里并不能保持原有的文件路径，例如现在我有一个页面，路径为 app/controllers/Order/OrderListController.tsx，编译后的路径变成了 dist/OrderListController.js，那如果不加这个配置呢，默认在相同的目录下，即 app/controllers/Order/OrderListController.js，但是这样 tsx 文件和 js 文件就混杂在一起，也不是很简洁，ts 初学阶段，还没有摸索出更好的配置 🙃🙃

### <span id="auto-compiler">代码自动编译</span>
 
```js
/**
 * 在最顶层设置compileOnSave标记，可以让IDE在保存文件的时候根据tsconfig.json重新生成文件。
 * 要想支持这个特性需要Visual Studio 2015， TypeScript1.8.4 以上并且安装 atom-typescript插件。
*/
"compileOnSave": true,
```

或者 

终端 -> 运行任务 -> tsc:监视-tsconfig.json

### <spqn id="questions">在使用过程中遇到的问题</span>

#### <span id="question-import">导入某个模块</span>

🌰🌰🌰

```js
/**
 * [ts] 找不到模块“react-native-router-flux”。 [2307]
*/
import { Actions } from 'react-native-router-flux';
```

原因是 typescript 是从 node_modules/@types 目录下去找模块声明，有些库并没有提供 typescript 的声明文件，所以就需要自己去添加。

解决办法：我们可以新建一个 typings 文件夹，新建文件 `components.d.ts`

```js
declare module 'react-native-router-flux';
```

注意仅仅这些还不够，在 tsconfig 文件里还需要添加配置

```json
"include": [
	    "typings/**/*.d.ts", /* 注意这行，需要把 typings 文件夹下的 *.d.ts 加入编译文件 */
	    "app/**/*.ts",
	    "app/**/*.tsx"
  ],
```

这里就不得不说一说 `index.d.ts` 文件的作用了，观察 node_modules/@types 文件夹，你会发现一些有趣的文件 ---- index.d.ts。

上面我们添加了依赖 `@types/react` 和 `@types/react-native`，在 @types 文件夹下，它为我们的 `react` 和 `react-native` 添加了不同的 `.d.ts` 文件。

`*.d.ts` 就像 C/C++ 中的 .h 文件。它的作用可以简单理解为就是声明类和库的 API。

通俗一点解释，用 ts 写的模块在发布的时候仍然是用 js 发布，这就导致一个问题：ts 那么多类型数据都没了，所以需要一个 d.ts 文件来标记某个 js 库里面对象的类型。

官方文档链接：[@types，typeRoots和types](https://www.tslang.cn/docs/handbook/tsconfig-json.html#types-typeroots-and-types)

#### <span id="question-constructor">构造函数</span>

```js
error TS7006: Parameter 'props' implicitly has an 'any' type.

16     constructor(props) {
```

意思是说 props 有一个隐式的 any 类型，需要我们加上

```js
constructor(props: any) {
	super(props);
}
```

#### <span id="question-props">使用属性</span>

在访问属性时

```js
/**
 * error TS2339: Property 'orderId' does not exist on type 'Readonly<{ children?: ReactNode; }> & Readonly<{}>'.
*/
<View style={{flex: 1, justifyContent: "center", alignItems: 'center'}}>
    <Text>订单详情: {this.props.orderId}</Text>
</View>
```

什么意思呢？

即在 props 上找不到 orderId 属性，原因是ts是静态语言，类型是需要定义的，未定义就有可能找不到。

那么我们就给 props 一个类型：这里我们给一个 any 类型，props 更像一个 object 类型，但是 object 上并没有 orderId 这个属性，那么怎么办呢，我们可以给一个 any 类型。

```js
extends React.Component<any>
```

官方文档 [基础类型
](https://www.tslang.cn/docs/handbook/basic-types.html)

> 有时候，我们会想要为那些在编程阶段还不清楚类型的变量指定一个类型。 这些值可能来自于动态的内容，比如来自用户输入或第三方代码库。 这种情况下，我们不希望类型检查器对这些值进行检查而是直接让它们通过编译阶段的检查。 那么我们可以使用 any类型来标记这些变量。

> any类型是十分有用的，它允许你在编译时可选择地包含或移除类型检查。 你可能认为 Object有相似的作用，就像它在其它语言中那样。 但是 Object类型的变量只是允许你给它赋任意值 - 但是却不能够在它上面调用任意的方法，即便它真的有这些方法。

> 当你只知道一部分数据的类型时，any类型也是有用的。


#### React.Component

extends React.Component 时接收两个参数: `extends React.Component<Props, State>`, 这里的 Props 和 State 都表示一种类型，我们可以定义这个类型

[对象的类型——接口](https://github.com/xcatliu/typescript-tutorial/blob/master/basics/type-of-object-interfaces.md)

```
interface Props {
	orderId: string | number
}

interface State {
}

extends React.Component<Props, State>
```