## JS

### 实例

##### 元素是否在可见区域

```ts
// 1. vue use 库
 const makePhotoElement = ref<HTMLDivElement>();
 const makePhotoElementIsVisible = useElementVisibility(makePhotoElement);

// 2. 自制
import type { Ref } from 'vue';

export function useCustomElementVisibility(elementRef: Ref<HTMLElement | undefined>) {
    const visible = ref(false);
    const observer = new IntersectionObserver((entries) => {
        visible.value = entries[0].isIntersecting;
    }, { threshold: 0.2 });

    watch(() => elementRef.value, () => {
        if (elementRef.value) {
            observer.observe(elementRef.value);
        }
    });

    return {
        visible,
    };
}
```

##### 滚动到顶部

```ts
document.getElementById('app')?.scrollIntoView();
// 或者
window.scrollTo(0, 0);
```

##### 颜色获取工具

[图片取色器/拾色器 | 菜鸟工具](https://c.runoob.com/front-end/6214/#f0f4f8)

##### 获取远程图片并转换为base64格式

浏览器图片获取出现跨域错误, 故使用node获取以规避跨域问题

```typescript
const { data } = await axios.get(colorizedImageUrl, {
      responseType: 'arraybuffer'
})
const base64Str = Buffer.from(data, 'binary').toString('base64')
return `data:image/jpeg;base64,${base64Str}`
```

##### 格式化时间

```js
// ISO格式: '2012-11-04T14:51:06.157Z'
// 输出格式: '2012-11-04_14:55:45'
Date.now().toISOString().replace(/T/, '_').replace(/\..+/, '')

// 2022-03-27_06_33_45
Date.now().toISOString().replace(/T/, '_').replace(/\..+/, '').replace(/:/g, '_')
```

##### 小数转为整数

```js
// 向下
Math.floor(12.9999) // 12
// 向上
Math.ceil(12.1) // 13
// 四舍五入
Math.round(12.5) // 13
Math.round(12.4) // 12
```

##### 使用0或""作为初始值

**空值合并操作符**（**`??`**）是一个逻辑操作符，当左侧的操作数为 [`null`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/null) 或者 [`undefined`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/undefined) 时，返回其右侧操作数，否则返回左侧操作数. [MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing_operator) 

```js
const foo = null ?? 'default string';
console.log(foo);
// expected output: "default string"

const baz = 0 ?? 42;
console.log(baz);
// expected output: 0
```

与||的区别

​    由于 `||` 是一个布尔逻辑运算符，左侧的操作数会被强制转换成布尔值用于求值。任何假值（`0`， `''`， `NaN`， `null`， `undefined`）都不会被返回。这导致如果你使用`0`，`''`或`NaN`作为有效值，就会出现不可预料的后果

```js
let count = 0;
let text = "";

let qty = count || 42;
let message = text || "hi!";
console.log(qty);     // 42，而不是 0
console.log(message); // "hi!"，而不是 ""
```

##### 常用正则表达式

[正则什么的，你让我写，我会难受，你让我用，真香！ - 掘金](https://juejin.cn/post/7111857333113716750#heading-12)

### 语法

### 字符串

##### 查找字符串

```js
// 区分大小写
fileList.filter(it => it.filename.includes(keyword))

// 不区分大小写
/* 
    /i (忽略大小写)
    /g (全文查找出现的所有匹配字符)
    /m (多行查找)
    /gi(全文查找、忽略大小写)
    /ig(全文查找、忽略大小写)
*/
var str = "ABab";
var reg = new RegExp("Ba", 'i');
var reg2 = /ba/i;
console.log(str.match(reg)); // ["Ba", index: 1, input: "ABab"]
console.log(str.match(reg2)); // ["Ba", index: 1, input: "ABab"]
console.log(str.match(/aa/i)); // null

(it.filename.match(new RegExp(keyword, "i")) == null) ? false : true
```

##### 查找多个字符串

示例: 查找包含cat或者gif关键词的文件

```js
// 输入以空格分隔 
let keyword = "cat gif"
let regStr = `(${keyword.replaceAll(' ', '|')})` // (cat|gif)

// 判断依据, i的意思是忽略大小写
let arr = fileList.filter(it => {
              return (it.match(new RegExp(regStr, "i")) == null) ? false : true
            })
```

### 对象

#### 遍历对象

```js
const deps = {
  '采购部':[1,2,3],
  '人事部':[5,8,12],
  '行政部':[5,14,79],
  '运输部':[3,64,105],
}
```

##### 属性名列表

```js
Object.keys(deps) // [ "采购部", "人事部", "行政部", "运输部" ]
```

##### 属性值列表

```js
Object.values(deps)
```

```js
for(let dep in deps) {
  console.log(deps[dep]);
}
```

### 数组

##### 尾部插入

```js
arr.push("hi") // 会修改原数组
```

##### 头部插入

```js
arr.unshift("hi") // 会修改原数组
```

##### 指定位置插入

```js
let arr = [0, 1, 2]
arr.splice(2, 0, 9) // [ 0, 1, 9, 2 ] 在索引为2的项目前面插入
```

##### 删除头部

```js
arr.shift() // 会修改原数组
```

##### 删除尾部

```js
arr.pop() // 会修改原数组
```

##### 删除指定位置

```js
let arr = [0, 1, 2, 3]
arr.splice(1, 2) // [ 0, 3 ] 从索引为1的项目开始删除,一共删两个
```

##### 遍历

```js
// 项目为数值时不会修改数组
let arr = [0, 1, 2, 3]
arr.forEach(it => it = 5) // [ 0, 1, 2, 3 ]

// 项目为对象时会改变对象的属性
let arr = [{x:1}, {x:2}]
arr.forEach(it => it.x++) // [{x:2}, {x:3}]
```

##### 遍历并返回

```js
let arr = [{x:1}, {x:2}]
let arr1 = arr.map(it => {
  it.x++
  return it.x
})
console.log(arr); // [{x:2}, {x:3}]
console.log(arr1); // [ 2, 3 ]
```

##### 合并数组

[MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/flat)

```js
const arr1 = [0, 3, 1, 2, [3, 4]];

console.log(arr1.flat());
// expected output: [0, 3, 1, 2, 3, 4]

const arr2 = [0, 1, 2, [[[3, 4]]]];

console.log(arr2.flat(2));
// expected output: [0, 1, 2, [3, 4]]

const deps = {
    '采购部':[1,2,3],
    '人事部':[5,8,12],
    '行政部':[5,14,79],
    '运输部':[3,64,105],
}
let member = Object.values(deps).flat(Infinity);
```

##### 二维数组

```js
const dots: Array<Array<boolean>> = new Array()
for (let i = 0; i < mapSize.row; i++) {
  dots.push(new Array())
  for (let j = 0; j < mapSize.column; j++) {
    dots[i].push(false)
  }
}
dots[1][3] = true // 第2行,第4列
```

![image-20220408181913384](assets/image-20220408181913384.png)

##### 查找

```ts
const targetArticle = articles.find((article) => article.title === 'hello')
if(targetArticle) {
    console.log(targetArticle)
}
```

```ts
const targetIndex = articles.findIndex((article) => article.title === 'hello')
if(targetIndex > -1) {
    console.log(articles[targetIndex])
}
```

##### 过滤

```ts
const targetArticles = articles.filter((article) => article.title.length > 5)
```

### 集合

集合内的数据不重复

```js
let arr = [0, 1, 2, 0]
let set = new Set(arr) // [ 0, 1, 2 ]
if(set.has(2)) {
    alert('hello')
}
```

### 浏览器

#### 限制异步请求并发量

```ts
async function writeImageInfosToFirebaseGently(maxAsyncReqNum: number) {
      injectingToFirebase.value = true
      const promises = new Array<Promise<void>>()
      for (let i = 0; i < maxAsyncReqNum; i++) {
        const imageInfo = processedImageInfosArr.shift()
        if (imageInfo) {
          promises.push(postProcessedImageInfo(imageInfo))
        } else {
          break
        }
      }
      // 记得一点要设置退出条件
      if (promises.length > 0) {
        await Promise.all(promises)
        writeImageInfosToFirebaseGently(maxAsyncReqNum)
      } else { 
        injectingToFirebase.value = false;
      }
    }
```

#### 读取json

1. 写一个网页, 并使用Live Server启动它

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Cost by State</title>
</head>
<body>
  <h1>Cost by State</h1>
  <script src="index.js"></script>
</body>
</html>
```

2. 使用`fetch`请求获取json

```js
// index.js
fetch("data/zip_code_database_US.json")
  .then(res => res.json())
  .then(json => {
    console.log(json);
  })
```

![image-20220511144142824](assets/image-20220511144142824.png)

#### 读取文件

```js
/**
 * File -> base64
 * @param {File} file <input type="file">
 * @returns {Promise<string>} base64 string
 */
export function fileToBase64(file: File): Promise<string> {
    const reader = new FileReader();

    return new Promise<string>((resolve, reject) => {
        reader.onload = () => {
            resolve(reader.result as string);
        };

        reader.onerror = (err) => {
            reject(err);
        };

        // reader.readAsArrayBuffer(file);
        reader.readAsDataURL(file);
    });
}

async function processFile() {
  try {
    let file = document.getElementById('fileInput').files[0];
    let contentDataUrl = await readFileAsync(file);
    console.log(contentDataUrl);
  } catch(err) {
    console.log(err);
  }
```

#### 将图片转换成base64格式

```html
<img src="base64String"/>
```

```ts
/**
 * Image url -> base64
 * @param {string} url https://xxx.jpg
 * @returns {Promise<string>} base64 image string
 */
export function imageUrlToBase64(url: string) {
    const img = new Image();
    img.setAttribute('crossOrigin', 'anonymous');
    img.src = url;

    return new Promise<string>((resolve, reject) => {
        img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d');
            ctx!.drawImage(img, 0, 0);
            const dataURL = canvas.toDataURL('image/png');
            resolve(dataURL);
        };

        img.onerror = (err) => {
            reject(err);
        };
    });
}
```

### Nodejs

### 安装

##### windows 切换node版本

建议留下安装包直接卸载安装, 因为[nvm-windows](https://github.com/coreybutler/nvm-windows/releases) 效果不佳

##### ubuntu安装node

```shell
curl -sL https://deb.nodesource.com/setup_16.x | sudo -E bash -
sudo apt install nodejs -y
node --version
```

##### PM2 将node脚本部署为服务

使用pm2

```shell
pm2 start build/index.js
# 保存当前已经启动了的服务
pm2 save
# 设置开机自启的配置
pm2 startup
```

```shell
# 查看服务
pm2 ps
# 停止服务
pm2 stop 0
```

### 内置api

#### crypto模块

###### 计算MD5

MD5计算常用于校验文件完整性, 因为文件中有一个字节变了输出的md5字符串就不一样了. nodejs原生提供了计算md5的方法

```js
const buf = await fsp.readFile('1.jpg')
const hash = crypto.createHash('md5')
hash.update(buf)
const md5 = hash.digest('hex')
```

* windows
  
  ```powershell
  Get-FileHash -Algorithm MD5 MY_FILEPATH
  ```

#### url模块

文档地址: http://nodejs.cn/api/url.html

##### 解析url

```js
const myURL = new URL('https://user:pass@sub.example.com:8080/p/a/t/h?query=string#hash');
```

#### 多线程

文档地址: http://nodejs.cn/api/worker_threads.html 说得不是很清楚,还是看下面的示例吧

##### 示例计算MD5

* 代码: [3-worker_threads](3-worker_threads) 
1. 主进程`app.js`
   
   ```js
   const path = require('path')
   const getMD5Async = require('./worker')
   
   const filePath = path.join(__dirname, 'test.jpg')
   
   const handleUpload = async () => {
     console.log("In main", await getMD5Async(filePath));
   }
   
   setInterval(handleUpload, 1000)
   console.log("This is main thread");
   ```

2. 子线程生成函数`worker.js`
   
   ```js
   const { Worker } = require('worker_threads');
   const path = require('path');
   
   module.exports = function getMD5Async(filePath) {
     return new Promise((resolve, reject) => {
       const worker = new Worker(path.join(__dirname, 'getMD5.js'), {
         workerData: filePath
       });
       worker.on('message', resolve);
       worker.on('error', reject);
       worker.on('exit', (code) => {
         if (code !== 0) {
           reject(new Error(`Worker stopped with exit code ${code}`));
         } else {
           console.log("worker exit");
         }
       });
     });
   };
   ```

3. MD5计算函数`getMD5.js`
   
   ```js
   const { parentPort, workerData } = require('worker_threads');
   
   const crypto = require('crypto');
   const fsp = require('fs/promises')
   
   const getMD5 = async (filePath) => {
     const file = await fsp.readFile(filePath)
     const hash = crypto.createHash('md5')
     .update(file)
     .digest('hex');
     parentPort.postMessage(hash);
   }
   
   getMD5(workerData)
   ```

### 错误处理

示例

```js
// 中间函数抛出异常
function printNum(num) {
  if(typeof num !== "number") {
    throw new TypeError("Input should be a number, but we got a " + typeof num);
  } else {
    console.log(num);
  }
}

// 在主程序中捕获异常并处理
try {
  printNum("hi");
} catch (error) {
  console.error(error);
}

// 一般来说如果程序出错, 那么js直接就崩溃了
// 但是如果用了try catch, 那么后面的代码还是会执行
printNum(123);
```

```
TypeError: Input should be a number, but we got a string
123
```

在 JS 中其实封装了一个类，方面我们抛出异常用：

```js
throw new Error('error msg')
```

一个 Error 实例包含三个属性：

- `message`：创建 Error 对象时传入的参数
- `name`：Error 实例的名称，通常和类名一致
- `stack`：整个 Error 的错误信息，包含函数的调用栈，当我们直接打印 Error 对象时，打印的就是 stack

同时 Error 也有子类：

- `RangeError`：索引值越界时使用的错误类型
- `SyntaxError`：解析语法错误使用的错误类型
- `TypeError`：出现类型错误时使用的错误类型

### TypeScript

#### 安装

使得js可以拥有类型, 这样才能有代码提示

1.安装 TypeScript

```shell
npm install -g typescript
```

2.编译 TypeScript 文件

```shell
# helloworld.ts => helloworld.js
tsc helloworld.ts
```

#### 描述对象的类型

```ts
interface Atricle {
    title: string;
    url: string;
    content: string;
    postTime: string;
}
```

#### 技巧

##### 字符串做下标报错

错误描述

```shell
error TS7053: Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{ en: LangString; zhCN: LangString; }'.
```

解决

```json
// tsconfig.json
"compilerOptions": {
    "suppressImplicitAnyIndexErrors": true
```

##### 忽略一行

```typescript
// @ts-ignore
```

忽略全文

```
// @ts-nocheck
```

取消忽略全文

```
// @ts-check
```

##### 参考资料

https://www.bilibili.com/video/BV1Zy4y1K7SH?p=156

## CSS

##### em vs rem

- [CSS 的值与单位 - 学习 Web 开发 | MDN](https://developer.mozilla.org/zh-CN/docs/Learn/CSS/Building_blocks/Values_and_units)

- **em 单位的意思是“父元素的字体大小”**

- **rem 单位的意思是“根元素的字体大小”**

##### 等比例缩放图片

```css
.file-item-detail img {
  max-width: 3em;
}
```

##### 方块->多边形

![image-20220430201552851](assets/image-20220430201552851.png)

```css
div {
    -webkit-clip-path: polygon(100% 0, 100% 100%, 50% 80%, 0 100%, 0 0);
    clip-path: polygon(100% 0, 100% 100%, 50% 80%, 0 100%, 0 0);
}
```

- [可视化裁切网站](https://www.cssportal.com/css-clip-path-generator/) 

#### 可拖拽元素

- [MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/drag_event)
- [3-draggble_div](3-draggble_div)

#### 旋转扭转海报

![](C:\Users\arno7\Pictures\rotate.png)

```html
<body>
  <img class="background" src="https://miro.medium.com/max/1400/1*few-89t3Lc5M-WG4qQ8Uqg.jpeg">
</body>
```

```css
.background {
  transform-style: preserve-3d;
  transform: rotate(20deg) skew(-20deg);
}
```

### 响应式布局

##### 一个鞋子网站

- [视频](https://www.youtube.com/watch?v=gXLjWRteuWI)
- [代码](https://codepen.io/designcourse/pen/eYGPxQv) 

### 动画

```css
@keyframes fade-in {
  from {opacity: 0;}
  to {opacity: 1;}
}
.hello {
  animation-name: fade-in;
  animation-duration: 2s;
}
```

### 弹性布局

参考资料

* [Flex 布局教程：语法篇](https://www.ruanyifeng.com/blog/2015/07/flex-grammar.html) 

##### 主轴和交叉轴

<img src="assets/image-20211120125351395.png" alt="image-20211120125351395" style="zoom:67%;" />

<img src="assets/image-20211120125854722.png" alt="image-20211120125854722" style="zoom:67%;" />

##### 横向 vs 纵向

```css
/* 布局作用与.box的子元素 */
.box {
    display: flex;
    flex-direction: column;
}
```

<img src="assets/bg2015071005.png" alt="img" style="zoom:67%;" />

##### 换行

子元素排列超出父元素宽度时怎么处理

```css
.box{
    flex-wrap: nowrap | wrap | wrap-reverse;
}
```

1. nowrap(默认) 不换行

![img](assets/bg2015071007.png)

2. wrap 换行
   
   ![img](assets/bg2015071008.jpg)

3. wrap-reverse 反向换行

![img](assets/bg2015071009.jpg)

##### 对齐

`justify-content`定义了主轴上的对齐方式

```css
.box {
    justify-content: flex-start | flex-end | center | space-between | space-around;
}
```

![img](https://www.ruanyifeng.com/blogimg/asset/2015/bg2015071010.png)

`align-items`属性定义项目在交叉轴上如何对齐

```css
.box {
    align-items: flex-start | flex-end | center | baseline | stretch;
}
```

![img](assets/bg2015071011.png)

##### 空间分配

`flex-grow`属性定义项目的放大比例，默认为`0`，即如果存在剩余空间，也不放大。

```css
.item {
  flex-grow: <number>; /* default 0 */
}
```

![img](assets/bg2015071014.png)

如果所有项目的`flex-grow`属性都为1，则它们将等分剩余空间（如果有的话）。如果一个项目的`flex-grow`属性为2，其他项目都为1，则前者占据的剩余空间将比其他项多一倍。

flex-shrink属性

`flex-shrink`属性定义了项目的缩小比例，默认为1，即如果空间不足，该项目将缩小。

```css
.item {
  flex-shrink: <number>; /* default 1 */
}
```

![img](https://www.ruanyifeng.com/blogimg/asset/2015/bg2015071015.jpg)

如果所有项目的`flex-shrink`属性都为1，当空间不足时，都将等比例缩小。如果一个项目的`flex-shrink`属性为0，其他项目都为1，则空间不足时，前者不缩小。负值对该属性无效。

#### 布局实例

##### 固定导航栏

[2-圣杯布局](2-圣杯布局) 

![image-20211120145909821](assets/image-20211120145909821.png)

参考: [Flex 布局教程：实例篇](https://www.ruanyifeng.com/blog/2015/07/flex-examples.html) 

- 导航栏应使用height而不是min-height

##### 蒙板效果

![image-20220415183948516](assets/image-20220415183948516.png)

```css
.big-img {
  background-color: rgb(100, 100, 100, 1);
  position: absolute;
  width: 100vw;
  height: 100vh;
  left: 50%;
  top: 50%;
  transform:translate(-50%,-50%);
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
}
.big-img-preview {
  max-width: 22rem;
}
```

### 按钮

##### 按钮不可点击

![image-20220331111324654](assets/image-20220331111324654.png)

```css
.inactive {
  pointer-events: none;
  background:#dddddd;
  opacity: 0.5;
}
```

##### 按钮点击动画

```css
.light-button {
  height: 3em;
  min-width: 5em;
  margin: 0.2em 0.3em 0.2em 0.3em;
  border-radius: 0.3em;
  background-color: #fff;
  border: 0.05em solid #888;
}
.light-button:active {
  transform: scale(0.98);
  box-shadow: 0em 0.1em 0.3em rgba(0, 0, 0, 0.24);
  opacity: 0.5;
}
```

### 暗黑模式

1. 不同色彩
   
   ```css
   :root {
     --background-color-primary: #fff;
     --background-color-secondary: #eee;
     --text-color-primary: #222;
   }
   [color-theme="dark"] {
     --background-color-primary: #555;
     --background-color-secondary: #777;
     --text-color-primary: #eee;
   }
   select,
   span {
     color: var(--text-color-primary);
   }
   body {
     background-color: var(--background-color-primary);
     color: var(--text-color-primary);
   }
   ```
   
   ```js
   let colorTheme = ref("light")
   function toggleColorTheme() {
       colorTheme.value = colorTheme.value === "light" ? "dark" : "light"
       document.documentElement.setAttribute('color-theme', colorTheme.value)
   }
   ```

### 适配

#### iOS Safari

##### 禁用选择框默认样式

```css
.card-title select {
  outline: none;
  -webkit-appearance: button;
}
```

##### 阻止点击选择框页面自动放大

```html
- <meta name="viewport" content="width=device-width, initial-scale=1.0">
+ <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1">
```

##### 100vh底部导航栏不显示问题

![crw9gwsaykt81](assets/crw9gwsaykt81.jpg)

解决

```js
// App.vue

function safariHacks() {
      // First we get the viewport height and we multiple it by 1% to get a value for a vh unit
      let vh = window.innerHeight * 0.01
      // Then we set the value in the --vh custom property to the root of the document
      document.documentElement.style.setProperty('--vh', `${vh}px`)

      // We listen to the resize event
      window.addEventListener('resize', () => {
        // We execute the same script as before
        let vh = window.innerHeight * 0.01
        console.log(vh);
        document.documentElement.style.setProperty('--vh', `${vh}px`)
      })
    }
onMounted(() => {
      safariHacks()
    })
```

```css
#app {
  height: 100vh;
  /* 然后再增加一个属性👇 */
  height: calc(var(--vh, 1vh) * 100);
}
```

### 参考资料

* [后盾人教程](https://www.bilibili.com/video/BV1z4411S7Mb?p=1)
* [配色方案](https://flatuicolors.com/palette/defo)

##### 导入其他的样式文件

* 在样式文件中导入其他的样式文件
  
  ```css
  @import url("./menu.css")
  ```

##### 在vscode中使用less

1. 安装插件 Easy LESS

2. 创建一个 1.less 会自动生成一个 1.css

3. 在html中应用 1.css

##### 自动刷新浏览器

1. 安装插件 Live Server

2. 在html中右键, 点击 Open with Live Server

### 选择器

##### 结构选择器

* 子元素选择器
  
  ```css
  /* 只选择子元素中的h2,孙元素不管*/
  main article>h2 {
         color:coral;
       }
  ```

* 兄弟元素选择器
  
  ```css
  /* 选择顺序在h1之后的h2兄弟元素 */
  article h1~h2 {
         color:coral;
       }
  
  /* 选择顺序在h1之后的第一个h2兄弟元素 */
  article h1+h2 {
         color:coral;
       }
  ```

##### 属性选择器

* 根据标签的属性进行选择
  
  ```css
  h1[title="hello"] {
         color:coral;
       }
  
  <h1 title="hello">标题</h1>
  ```

* 细化
  
  ```css
  /* 以hello开头 */
  h1[title^="hello"] {
         color:coral;
       }
  
  /* 以com结束 */
  h1[title$="com"] {       
      color:coral;     
      }
  
  /* 任何位置有hi */
  h1[title*="hi"] {       
      color:coral;     
      }
  
  /* 以hello开始且以-连接的, 或者只有hello的 */
  h1[title|="hello"] {
          color:coral;
        }
  ```

##### 伪类选择器

* 根据标签的状态进行选择
  
  ```css
  /* 正在输入时 */
  input:focus {
      background-color: bisque;
  }
  
  /* 点击瞬间 */
  input:active {
      background-color: cornflowerblue;
  }
  
  /* 子元素中的第一个h2标签 */
  article>h2:first-of-type {
      color: crimson;
  }
  ```

* 根据元素编号选择
  
  ```css
  /* 子元素中的第n个元素*/
  article :nth-child(2){
      color: red;
  }
  ```

##### 排除选择器

* 排除
  
  ```css
  /* 选择前三个元素, 但是排除第一个 */
  main ul :nth-child(-n+3):not(:first-child) {
      background-color: antiquewhite;
  }
  ```

##### 表单中元素选择

* 示例
  
  ```html
  <style>
      input {
          height: 7mm;
      }
      /* 禁用输入项样式 */
      input:disabled {
          background-color: darkgrey;
      }
      input:enabled {
          background-color: cornsilk;
      }
  
      /* 多选框中被选择的变红 */
      input:checked + label{
          color: tomato;
      }
  </style>
  
  <form action="">
      <input type="text" disabled>
      <input type="text">
      <hr>
      <input type="radio" name="gender" id="male">
      <label for="male">男</label>
      <input type="radio" name="gender" id="female">
      <label for="female">女</label>
      <hr>
  </form>
  ```

### 文本样式

##### 水平对齐

```css
h2 {
    /* 标题居中 */
    text-align: center;
}
```

##### 缩进 行距

```css
p {
    /* 开头空2格 */
    text-indent: 2em;
    /* 两倍行距 */
    line-height: 2em;
}
```

##### 字符间距

```css
h2 {
    word-spacing: 1em;
    letter-spacing: 1em;
}
```

##### 排版模式

```css
div {
      height: 200px;
      border: solid 1px #ddd;
      /* 竖着写,从右向左 */
      writing-mode: vertical-rl;
    }
```

### 盒子模型

[参考文档](https://houdunren.gitee.io/note/css/5%20%E7%9B%92%E5%AD%90%E6%A8%A1%E5%9E%8B.html)

##### 边框

##### 轮廓

##### 显示

##### 溢出控制

### 背景处理

[参考文档](https://houdunren.gitee.io/note/css/6%20%E8%83%8C%E6%99%AF%E5%A4%84%E7%90%86.html) 

##### 背景样式

##### 盒子阴影

可以使用 `box-shadow` 对盒子元素设置阴影，参数为 `水平偏移,垂直偏移,模糊度,颜色` 构成。

<img src="assets/image-20210424071138135.png" alt="image-20210424071138135" style="zoom:50%; float: left;" />

```text
box-shadow: 10px 10px 5px rgba(100, 100, 100, .5);
```

## Vue3

### 创建响应式对象

##### 自定义组件使用v-model

[Vue 自定义组件 v-model 使用介绍 - 掘金](https://juejin.cn/post/7137488675700473869)

```html
<number-input v-model="hello"/>
```

```html
<script setup lang="ts">
  import { computed } from 'vue'

  interface Props {
    modelValue: number;
  }

  const props = defineProps<Props>()
  const emit = defineEmits(['update:modelValue'])

  const value = computed({
    get() {
      return props.modelValue
    },
    set(val) {
      emit('update:modelValue', val)
    }
  })
</script>

<template>
  <input
    type="number"
    v-model="value"
  >
</template>

<style scoped>
</style>
```

##### defineProps默认值

```ts
<script setup lang="ts">
    import remixiconUrl from '/@/assets/svgs/remixicon.symbol.svg';

    interface Props {
        name: string;
        size?: number;
    }
    const props = withDefaults(defineProps<Props>(), {
        size: 24,
    });
</script>
```

##### 基本类型

```vue
// Test.vue
<script lang="ts">
import { ref } from 'vue'

export default {
  name: "FileItem",
  setup() {
    let showDetail = ref(false)
    function toggleShowDetail() {
      showDetail.value = !showDetail.value
    }

    return {
      showDetail,
      toggleShowDetail,
    }
  }
}
</script>

<template>
  <div>
    <button @click="toggleShowDetail">更多...</button>
    <div v-if="showDetail"><span>亿点点细节</span></div>
  </div>
</template>
```

##### 对象

```vue
// Test.vue
<script lang="ts">
import { reactive } from 'vue'

export default {
  name: "FileItem",
  setup() {
    let arno = reactive({
      name: "Arno",
      weight: 61
    })
    function addWeight() {
      arno.weight ++
    }

    return {
      arno,
      addWeight
    }
  }
}
</script>

<template>
  <div>
    <h4>{{arno.weight}}</h4>
    <button @click="addWeight">weight++</button>
  </div>
</template>
```

##### 计算属性

```vue
// Test.vue
<script lang="ts">
import { computed, reactive, ref } from 'vue'

export default {
  name: "Test",
  setup() {
    let person = reactive({
      firstName: "Arno",
      lastName: "Solo"
    })

    let fullName = computed(() => {
      return person.firstName + '-' + person.lastName
    })

    let fullName1 = computed({
      get() {
        return person.firstName + '-' + person.lastName
      },
      set(value: string) {
        const nameArr = value.split('-')
        person.firstName = nameArr[0]
        person.lastName = nameArr[1]
      }
    })

    return {
      person,
      fullName,
      fullName1
    }
  }
}
</script>

<template>
  <div>
    <input type="text" v-model="person.firstName">
    <input type="text" v-model="person.lastName">
    <input type="text" v-model="fullName1">
    <p>{{fullName}}</p>
  </div>
</template>
```

##### 监视基本类型

```vue
// Test.vue
<script lang="ts">
import { computed, reactive, ref, watch } from 'vue'

export default {
  name: "Test",
  setup() {
    let sum = ref(1)
    let msg = ref("Hello")

    function add() {
      sum.value++
    }

    // 监视单个ref
    // watch(sum, (newVal, oldVal) => {
    //   console.log("sum changed", oldVal, "->", newVal);
    // })

    // 监视多个ref
    watch([sum, msg], (newVal, oldVal) => {
      console.log("sum changed", oldVal[0], "->", newVal[0]);
      console.log("msg changed", oldVal[1], "->", newVal[1]);
    })

    return {
      sum, add, msg,
    }
  }
}
</script>

<template>
  <h2>{{sum}}</h2>
  <button @click="add">sum++</button>
</template>
```

##### 监视对象

```vue
// Test.vue
<script lang="ts">
import { computed, reactive, ref, watch } from 'vue'

export default {
  name: "Test",
  setup() {
    let person = reactive({
      name: "Arno",
      weight: 61,
    })

    function addWeight() {
      person.weight++
    }

    function changeName() {
      person.name += "~"
    }

    // 1.监视对象
    //  - 无法捕获oldVal
    //  - 会自动开启深度监视
    // watch(person, (newVal, oldVal) => {
    //   console.log("person changed", oldVal, "->", newVal);
    // })

    // 2.监视对象的某个属性
    //  - 可捕获oldVal
    // watch(() => person.weight, (newVal, oldVal) => {
    //   console.log("person changed", oldVal, "->", newVal);
    // })

    // 3.监视对象的多个属性
    //  - 可捕获oldVal
    watch([() => person.weight, () => person.name], (newVal, oldVal) => {
      console.log("person changed", oldVal, "->", newVal);
    })

    return {
      person, addWeight, changeName
    }
  }
}
</script>

<template>
  <h2>{{person.name}}</h2>
  <h2>{{person.weight}}</h2>
  <button @click="addWeight">weight++</button>
  <button @click="changeName">changeName++</button>
</template>
```

##### watchEffect

智能监视, 对watchEffect中使用到的属性进行监视

```vue
// Test.vue
<template>
  <h2>{{person.name}}</h2>
  <h2>{{person.weight}}</h2>
  <button @click="addWeight">weight++</button>
  <button @click="changeName">changeName++</button>
</template>

<script lang="ts">
import { computed, reactive, ref, watch, watchEffect } from 'vue'

export default {
  name: "Test",
  setup() {
    let person = reactive({
      name: "Arno",
      weight: 61,
    })

    function addWeight() {
      person.weight++
    }

    function changeName() {
      person.name += "~"
    }

    watchEffect(() => {
      const name = person.name
      console.log("有些属性改变了.");
    })

    return {
      person, addWeight, changeName
    }
  }
}
</script>
```

##### 丢失响应式的问题 toRef

- 问题描述
  
  ```vue
  // Test.vue
  <template>
    <h2>{{name}}</h2>
    <h2>{{weight}}</h2>
    <button @click="addWeight">weight++</button>
    <button @click="changeName">changeName++</button>
  </template>
  
  <script lang="ts">
  import { computed, reactive, ref, watch, watchEffect } from 'vue'
  
  export default {
    name: "Test",
    setup() {
      let person = reactive({
        name: "Arno",
        weight: 61,
      })
  
      function addWeight() {
        person.weight++
      }
  
      function changeName() {
        person.name += "~"
      }
  
      return {
        name: person.name, // 直接导出丢失响应式, 因为返回的是一个普通对象而不是一个响应式对象
        weight: person.weight,
        addWeight, 
        changeName
      }
    }
  }
  </script>
  ```

- 解决
  
  ```vue
  // Test.vue
  <template>
      <input type="text" v-model="firstName">    
      <input type="text" v-model="lastName">    
      <p>
          {{firstName}}-{{lastName}}
      </p>
  
  </template>
  
  <script lang="ts">
  import { computed, reactive, ref, watch, watchEffect, toRef } from 'vue'
  
  export default {
    name: "Test",
    setup() {
      let person = reactive({
        name: {
            first: "Arno",
            last: "Solo"
        }
      })
  
      return {
        firstName: toRef(person.name, "first"),
        lastName: toRef(person.name, "last"),
      }
    }
  }
  </script>
  ```

- toRefs方法
  
  ```js
  // toRefs会返回响应式对象而不是直接返回的普通对象
  return {
        ...toRefs(person),
      }
  ```

##### Reactive数组赋值

```html
<script setup lang="ts">
    let selectedFiles = reactive<Array<File>>([])
    function setSelectedFile (newFiles: Array<File>):void {
      selectedFiles.length = 0
      selectedFiles.push(...newFiles)
    }
</script>
```

#### emit

##### 文件上传组件

1. 子组件
   
   ```html
   <script setup lang="ts">
   import { ref } from 'vue';
   
   interface Props {
     accept?: string;
     multiple?: boolean;
   }
   
   withDefaults(defineProps<Props>(), {
     accept: 'image/*',
     multiple: false,
   })
   
   const emit = defineEmits(['file-change']);
   
   const file_picker = ref();
   
   function selectFile() {
     file_picker.value?.click();
   }
   
   async function handleFileChange() {
     const { files } = file_picker.value;
     emit('file-change', files);
   }
   </script>
   
   <template>
     <div @click="selectFile">
       <input 
         ref="file_picker" 
         type="file"
         :accept="accept"
         :multiple="multiple"
         @change="handleFileChange" 
         class="hidden"
       />
       <slot></slot>
     </div>
   </template>
   
   <style>
   </style>
   ```

2. 父组件
   
   ```html
   <file-picker @file-change="handleFileChange">
     <button class="py-3 w-full md:w-48 rounded-full text-white text-xl font-semibold bg-gradient-to-r from-sky-400 to-indigo-500">
                   {{ $t('homePage.uploadImage') }}
     </button>
    </file-picker>
   
   <script lang="ts">
       const selectedFiles = reactive<Array<File>>([]);
       function setSelectedFiles(newFiles: Array<File>) {
             selectedFiles.length = 0;
             for (let f of newFiles) selectedFiles.push(f);
         }
       function handleFileChange(newFiles: Array<File>) {
             setSelectedFiles(newFiles);
         }
   </script>
   ```
   
   有`export default`

```html
// FileList.vue
<template>
    <FileItem
      v-for="item in fileList"
      :key="item.md5"
      :fileInfo="item"
      @delete_item="deleteFileItem"
    ></FileItem>
</template>

<script lang="ts">
import { ref } from 'vue'
import { LangString } from '../langStrings';
import FileItem from './FileItem.vue'

export default {
  name: "FileList",
  components: {FileItem},
  setup() {
    let fileList = ref([])
    function deleteFileItem(md5: string) {
      const i = fileList.value.findIndex(file => file.md5 === md5)
      fileList.value.splice(i, 1)
    }
    return {
      fileList
    }
  }
}
</script>
```

```vue

```

#### 生命周期

```vue
// Test.vue
<template>
  <h2>{{person.name}}</h2>
  <h2>{{person.weight}}</h2>
  <button @click="addWeight">weight++</button>
</template>

<script lang="ts">
import { onMounted, reactive} from 'vue'

export default {
  name: "Test",
  setup() {
    let person = reactive({
      name: "Arno",
      weight: 61,
    })

    function addWeight() {
      person.weight++
    }

    onMounted(() => {
      console.log("Component mounted");
    })

    return {
      person, addWeight
    }
  }
}
</script>
```

#### 路由

```vue
// 导航栏跳转
<script lang="ts">
import { ref, watch } from 'vue'
import { LangString } from '../langStrings';
import { useRoute, useRouter } from 'vue-router';

export default {
  name: "NavBar",
  setup() {
    const router = useRouter()
    const route = useRoute()
    let actived = ref("home")

    function toHome() {
      router.push('/')
    }

    function toSetting() {
      router.push('/setting')
    }

    watch(() => route.path, (newVal, oldVal) => {
      console.log("actived bar changed", oldVal, "->", newVal);
      switch (newVal) {
        case '/setting':
          actived.value = "setting"
          break;
        case '/':
          actived.value = "home"
          break;
        default:
          break;
      }
    })

    return {
      actived, toHome, toSetting
    }
  },
}
</script>

<template>
  <div class="navbar">
    <img @click="toHome" src="../assets/home-active.svg" alt="home-pic" class="navbar-home-img" :class="{'active': actived == `home`}">
    <img @click="toSetting" src="../assets/setting-active.svg" alt="setting-pic" class="navbar-setting-img" :class="{'active': actived == `setting`}">
  </div>
</template>
```

### 实例

#### v-html指令渲染出的内容如何添加样式

https://www.jianshu.com/p/fed3d2be9783

深度选择器

```html
 <div
                    v-dompurify-html="article.content"
                    class="article-content"
                    border-1 px-4 py-6
                />

<style scoped>
     .article-content :deep(h1) {
        font-weight: 700;
        font-size: 36px;
        padding-bottom: 10px;
    }
</style>
```

如果使用scss或者less等css扩展语言，则用/deep/替代

```html
<div class="product-detail">
                    <section
                        v-dompurify-html="product.detail"
                        border-1 px-4 py-6
                    />
                </div>
<style scoped lang="scss">
    :deep(.product-detail) {
        h1 {
            font-weight: 700;
            font-size: 36px;
            padding-bottom: 10px;    
    }
}
</style>
```

#### 照片浏览组件

[GitHub - mirari/v-viewer at v3](https://github.com/mirari/v-viewer/tree/v3) 

<img title="" src="assets/e86d4ff40fe401ecb745cde7dab0f01588ad9f0d.png" alt="a36.png" width="221">

#### 文件上传

```html
<template>
    <input @change="uploadFile" ref="filepicker" type="file" multiple="true" class="hide">
    <button @click="selectFile" class="light-button light-button-content">
        <span>{{str.chooseFile}}</span>
    </button>
</template>

<script lang="ts">
    const filepicker = ref();
    function selectFile() {
        filepicker.value.click();
    }
    async function uploadFile() {
        const files = filepicker.value.files;
    }
</script>
```

#### 图片路径包含着数组中打包后不显示

解决方法是将图片先import进来

```vue
<script setup lang="ts">
import watermark_layout_lb from '../assets/watermark_layout_lb_noborder.svg'

let layoutOptions = reactive<Array<LayoutOption>>([
  {
    src: watermark_layout_lb,
    value: 'left_bottom',
    isActive: false,
  },
])
</script>

<img v-for="layout of layoutOptions" :src="layout.src" :alt="layout.value"  class="pt-1 rounded-lg border">
```

##### 动态class

```vue
<div :class="{'actived': isActive}"></div>
```

## Vite

[vite 中文文档](https://cn.vitejs.dev/guide/#scaffolding-your-first-vite-project) 

#### 创建新项目

```shell
npm create vite@latest
yarn create vite
```

#### 项目模板

- [demo1-vue3-ts-router-i18n-tailwind](demo1-vue3-ts-router-i18n-tailwind) 

#### 局域网https

1. 安装`mkcert`
   
   ```powershell
   # Admin required
   choco install mkcert
   ```

2. 生成证书
   
   ```cmd
   # 创建一个keys目录
   mkcert localhost
   ```

3. 在vite中使用
   
   ```ts
   // vite.config.ts
   export default defineConfig({
     plugins: [vue()],
     server: {
       https: {
         key: fs.readFileSync('keys/localhost-key.pem'),
         cert: fs.readFileSync('keys/localhost.pem')
       }
     }
   })
   ```

4. 访问 https://192.168.10.4:5173/

#### 使用/@/路径而不是../路径

```ts
// vite.config.ts
const path = require('path');

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '/@': path.resolve(__dirname, './src'),
    },
  },
})
```

```json
// tsconfig.json
"compilerOptions" {
    ...
    "baseUrl": ".",
    "paths": {
      "/@/*": [
        "src/*"
      ]
    }
}
```
