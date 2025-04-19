import{_ as a,a as e,b as n}from"./chunks/591426f25c434af02884acbdcb8e316b7dcfd44459c6af456c5c5a92c34bd71e.DdpQUoCn.js";import{_ as l,c as t,l as s,a as h,t as p,a1 as k,o as d}from"./chunks/framework.DWel0D03.js";const o="/blog/assets/537eedde7d55c4c2850180bb33aea5866d7924aacb2ca88992d41fc185810b8f.GfDcSnYr.png",c="/blog/assets/fa00d51854579103ad90b664716199d03c78282873aa025251358e5c4fbf3524.ABfGjmM8.png",r="/blog/assets/d5f20f382a26d66148925923d62bbc7ec97499653776d5767cce5ea22daef44c.BA9mlQB8.png",E="/blog/assets/674fe85472d0acb3cc61adc8f205faf9788118ae1cac684e8f9973efa08007bb.BZ8TR66o.png",g="/blog/assets/565df8a386c7e7ee8fa84ec936e2535dd653e02c4cc3b5774233752d6772bf9b.CDwp_raf.jpeg",F="/blog/assets/db10ddb275244c0a41983faeced2e4fc90398af07450cac709ad88af5cdfed0b.CLx1KlFc.png",y="/blog/assets/dabf68c784e23522969c69743eb5dbcbd0c72439417949136e1a18c5f9fc68a5.B9PBRnH4.png",u="/blog/assets/38f19b971085f46c929e044916dfe2939781320a012a0d06087b8be478142aa6.CS89wVeG.png",f="/blog/assets/96d33808314288722e8ac494228bbecb799e30e13a4a4eb2631447d915bb8acd.D3s60N0c.png",I=JSON.parse('{"title":"构建一个 iOS 应用并上传到 TestFlight","description":"手动构建一个 iOS 应用并上传到 TestFlight. 使用 Xcode Cloud 自动构建一个iOS 应用并上传到 TestFlight.","frontmatter":{"title":"构建一个 iOS 应用并上传到 TestFlight","lang":"zh-CN","description":"手动构建一个 iOS 应用并上传到 TestFlight. 使用 Xcode Cloud 自动构建一个iOS 应用并上传到 TestFlight."},"headers":[],"relativePath":"zh-CN/5-build-ios-app-with-xcode-cloud.md","filePath":"zh-CN/5-build-ios-app-with-xcode-cloud.md"}'),b={name:"zh-CN/5-build-ios-app-with-xcode-cloud.md"},C={id:"frontmatter-title",tabindex:"-1"},A=s("a",{class:"header-anchor",href:"#frontmatter-title","aria-label":'Permalink to "{{ $frontmatter.title }}"'},"​",-1),m=k('<h2 id="目标" tabindex="-1">目标 <a class="header-anchor" href="#目标" aria-label="Permalink to &quot;目标&quot;">​</a></h2><ol><li>提交一个<code>commit</code>到<code>Github仓库</code>的<code>main</code>分支后.<div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">git</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> push</span></span></code></pre></div></li><li>观察到<code>Xcode Cloud</code>自动开始构建应用, 并将构建结果发布到<code>TestFlight</code>上.</li></ol><h2 id="前提条件" tabindex="-1">前提条件 <a class="header-anchor" href="#前提条件" aria-label="Permalink to &quot;前提条件&quot;">​</a></h2><ol><li>你的<code>Apple ID</code>已加入<a href="https://developer.apple.com/cn/programs/" target="_blank" rel="noreferrer">苹果开发者计划</a></li><li>一个<code>Github</code>账户</li></ol><h2 id="创建一个-xcode-项目" tabindex="-1">创建一个 Xcode 项目 <a class="header-anchor" href="#创建一个-xcode-项目" aria-label="Permalink to &quot;创建一个 Xcode 项目&quot;">​</a></h2><h3 id="创建一个新的bundle-id" tabindex="-1">创建一个新的<code>Bundle ID</code> <a class="header-anchor" href="#创建一个新的bundle-id" aria-label="Permalink to &quot;创建一个新的`Bundle ID`&quot;">​</a></h3><p>每一个苹果应用都有一个ID, 苹果称之为<code>Bundle ID</code>. 这个ID可以在苹果开发者网站中申请, 具体的网址为 <a href="https://developer.apple.com/account/resources/identifiers/list" target="_blank" rel="noreferrer">Apple Developer &gt; Account &gt; Certificates, IDs &amp; Profiles &gt; Identifiers</a>. <img src="'+o+'" alt="picture 0"></p><h3 id="创建一个app-store-connect-app" tabindex="-1">创建一个<code>App Store Connect App</code> <a class="header-anchor" href="#创建一个app-store-connect-app" aria-label="Permalink to &quot;创建一个`App Store Connect App`&quot;">​</a></h3><p>想要在<code>App Store</code>发布应用, 就必须用到 <a href="https://appstoreconnect.apple.com/" target="_blank" rel="noreferrer">App Store Connect</a> 网站. 之后像是什么更新应用, 添加<code>TestFlight</code>测试者, 查看<code>Xcode Cloud</code>日志, 全部都是在这个网站上操作的.</p><ol><li>在 Apps 页面点击 New App.</li><li>填写 New App 表格. 你可能会问 SKU 怎么写, 其实可以随便写, 我一般直接填入<code>Bundle ID</code>. <img src="'+c+'" alt="picture 1"></li></ol><h3 id="创建xcode项目" tabindex="-1">创建<code>Xcode</code>项目 <a class="header-anchor" href="#创建xcode项目" aria-label="Permalink to &quot;创建`Xcode`项目&quot;">​</a></h3><ol><li>打开<code>Xcode</code>, 创建一个新的项目.</li><li>然后将此项目的<code>Bundle ID</code>修改为我们新创建的<code>Bundle ID</code>. 修改位置在 <code>左侧导航栏</code> &gt; <code>app.xcodeproj</code> &gt; <code>Signing &amp; Capabilities</code> &gt; <code>Signing</code> &gt; <code>Bundle Identifier</code>. <img src="'+r+'" alt="picture 2"></li><li>修改<code>Bundle ID</code>后, <code>Xcode</code>会自动获取<code>Profile</code>. 点击 <code>Provisioning Profile</code> 右边的i图标, 如果全部是打勾, 则说明获取成功. <img src="'+E+`" alt="picture 3"></li><li>在 iOS 模拟器上运行该项目, 保证该项目可以正常运行.</li></ol><h2 id="手动构建并上传" tabindex="-1">手动构建并上传 <a class="header-anchor" href="#手动构建并上传" aria-label="Permalink to &quot;手动构建并上传&quot;">​</a></h2><div class="warning custom-block"><p class="custom-block-title">注意</p><p>在设置 <code>Xcode Cloud</code> 自动构建之前, 请务必先完成一次手动上传. 因为这能保证您在设置 <code>Xcode Cloud</code> 自动构建的时候遇到的问题全部都是 <code>Xcode Cloud</code> 造成的, 而不是由于源码或者 <code>TestFlight</code> 导致的.</p></div><h3 id="设置应用图标" tabindex="-1">设置应用图标 <a class="header-anchor" href="#设置应用图标" aria-label="Permalink to &quot;设置应用图标&quot;">​</a></h3><ul><li>这一操作是必须的, 因为没有应用图标将会导致手动上传到<code>TestFlight</code>失败</li><li>此图片不得有<code>alpha通道</code>. 因为应用图标如有<code>alpha通道</code>, 将导致<code>Xcode Cloud</code>构建. 您可以通过将应用图标转换为<code>jpeg</code>格式来解决这个问题, 因为<code>jpeg</code>格式的图片没有<code>alpha通道</code>.</li></ul><h3 id="设置加密方式" tabindex="-1">设置加密方式 <a class="header-anchor" href="#设置加密方式" aria-label="Permalink to &quot;设置加密方式&quot;">​</a></h3><p>设置 <code>Info.plist</code> 中 <code>ITSAppUsesNonExemptEncryption</code> 键的值.</p><ul><li>这个键的值反应了当前应用的加密方式, 如果您不知道那是什么, 可以将其设置为 <code>false</code>.</li><li>这一操作是必须的, 因为如果没有在 <code>Info.plist</code> 中设置该键值, 每次发布 <code>TestFlight</code> 前, 您将需要在 <code>App Store Connect</code> 中手动设置应用的加密方式.</li></ul><div class="language-xml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">xml</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">dict</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">   ...</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">   &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">key</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;ITSAppUsesNonExemptEncryption&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">key</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">   &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">false</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">/&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">dict</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span></code></pre></div><h3 id="构建-上传" tabindex="-1">构建, 上传 <a class="header-anchor" href="#构建-上传" aria-label="Permalink to &quot;构建, 上传&quot;">​</a></h3><ol><li>设置 <code>Run Destination</code> 为 <code>Any iOS Device</code></li><li>点击 <code>顶部菜单栏</code> &gt; <code>Product</code> &gt; <code>Archive</code> 以开始构建</li><li>在构建完成后一个名为 <code>Archives</code> 的窗口会自动弹出(该窗口亦可通过 <code>顶部菜单栏</code> &gt; <code>Window</code> &gt; <code>Organizer</code> 打开). 选择刚刚生成的 <code>Archive</code>, 然后点击 <code>Distribute App</code>. 如此, 应用便开始上传到<code>TestFlight</code>. <img src="`+a+'" alt="picture 0"></li></ol><h3 id="创建-testflight-测试组" tabindex="-1">创建 TestFlight 测试组 <a class="header-anchor" href="#创建-testflight-测试组" aria-label="Permalink to &quot;创建 TestFlight 测试组&quot;">​</a></h3><ol><li>当<code>Archive</code>上传完成后, 你就能在 <a href="https://appstoreconnect.apple.com/" target="_blank" rel="noreferrer">App Store Connect &gt; TestFlight</a> 网页中找到你刚刚上传的项目了.</li><li>在<code>TestFlight</code>中创建一个<code>内部测试组</code>(INTERNAL TESTING).</li><li>将测试者的<code>Apple ID</code>加到组里. 这一操作会使得 <code>TestFlight</code> 向你的 <code>Apple ID</code> 对应的邮箱发送一封邀请邮件. <ul><li>注意, 如果测试者不是当前开发者帐号的成员, 需要先要求他的<code>Apple ID</code>成为开发者帐号的成员.</li></ul></li></ol><h3 id="接受-testflight-邀请" tabindex="-1">接受 TestFlight 邀请 <a class="header-anchor" href="#接受-testflight-邀请" aria-label="Permalink to &quot;接受 TestFlight 邀请&quot;">​</a></h3><ol><li>测试者首先需要保证自己的设备已安装 <code>TestFlight 应用</code>. 如尚未安装, 请到 <a href="https://apps.apple.com/us/app/testflight/id899247664" target="_blank" rel="noreferrer">App Store</a> 安装 <img src="'+g+'" alt="picture 0"></li><li>测试者检查其 <code>Apple ID</code> 对应的邮箱, 找到来自 <code>TestFlight</code> 的邀请邮件.</li><li>点击邮件中的 <code>View in TestFlight</code> 按钮, 这将打开 <code>TestFlight 应用</code>, <code>TestFlight 应用</code> 会询问你是否接受邀请, 点击 <code>Accept</code>. 如此测试者将能够在 <code>TestFlight 应用</code> 中找到测试应用, 测试应用更新时测试者的设备将会收到通知. <img src="'+F+'" alt="picture 5"></li></ol><h3 id="再次上传" tabindex="-1">再次上传 <a class="header-anchor" href="#再次上传" aria-label="Permalink to &quot;再次上传&quot;">​</a></h3><h4 id="加大版本号" tabindex="-1">加大版本号 <a class="header-anchor" href="#加大版本号" aria-label="Permalink to &quot;加大版本号&quot;">​</a></h4><p>如果你想上传一个<s>船新版本</s>新的版本到<code>TestFlight</code>, 那么你必须先到 <code>左侧导航栏</code> &gt; <code>app.xcodeproj</code> &gt; <code>General</code> &gt; <code>Identity</code> 加大应用的版本号. 因为 <code>TestFlight</code> 只接受比当前版本大的 <code>Archive</code>. <img src="'+e+`" alt="picture 2"></p><h2 id="xcode-cloud-自动构建并上传" tabindex="-1">Xcode Cloud 自动构建并上传 <a class="header-anchor" href="#xcode-cloud-自动构建并上传" aria-label="Permalink to &quot;Xcode Cloud 自动构建并上传&quot;">​</a></h2><p>在设置完 <code>Xcode Cloud workflow</code> 后, 每次 <code>Github仓库</code> 的 <code>main</code> 分支变化时, <code>Xcode Cloud</code> 就会自动开始构建 <code>Archive</code>, 完成后自动将其上传到 <code>TestFlight</code>.</p><h3 id="自动加大版本号" tabindex="-1">自动加大版本号 <a class="header-anchor" href="#自动加大版本号" aria-label="Permalink to &quot;自动加大版本号&quot;">​</a></h3><p>根据苹果的文档 <a href="https://developer.apple.com/documentation/xcode/writing-custom-build-scripts" target="_blank" rel="noreferrer">Writing custom build scripts | Apple</a>, <code>Xcode Cloud</code> 在构建 <code>Archive</code> 之前, 会运行项目文件夹下的 <code>ci_scripts/ci_post_clone.sh</code> 文件. 所以我们可以在该文件中运行一个<code>js</code>脚本来加大版本号.</p><div class="vp-code-group vp-adaptive-theme"><div class="tabs"><input type="radio" name="group-WVS5r" id="tab-6xU4X0u" checked="checked"><label for="tab-6xU4X0u">ci_post_clone.sh</label><input type="radio" name="group-WVS5r" id="tab-DLYM-E7"><label for="tab-DLYM-E7">changeAppInfo.mjs</label></div><div class="blocks"><div class="language-sh vp-adaptive-theme active"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#!/bin/sh</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">export</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> HOMEBREW_NO_INSTALL_CLEANUP</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">TRUE</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># Install node start</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">brew</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> install</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> node</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">brew</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> link</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> node</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># Install node end</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># TODO: Replace &quot;app&quot; with the product name of Xcode project</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">node</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> changeAppInfo.mjs</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> app</span></span></code></pre></div><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#!/usr/bin/env node</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> fs </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;node:fs/promises&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> path </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;node:path&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> process </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;node:process&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">/**</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> * Alert! Must pass Xcode project name as first param of the script.</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> * \`\`\`sh</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> * # app is Xcode project name</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> * node changeAppInfo.mjs app</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> * \`\`\`</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> */</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">async</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> function</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> main</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">() {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  try</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> args</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> process.argv.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">slice</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">2</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);  </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// Skip the first two elements</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> projectName</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> args.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">at</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    if</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(projectName </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">===</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> undefined</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">      throw</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> new</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> Error</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;[changeAppInfo] Must pass Xcode project name as first param of the script&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> configPath</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> path.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">resolve</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">\`../\${</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">projectName</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">}.xcodeproj/project.pbxproj\`</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    await</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> increaseVersion</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(configPath)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  catch</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (error) {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    console.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">error</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(error)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    process.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">exit</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">/**</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> * Increase version automatically in project.pbxproj file</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> * Build #26 1.2 -&gt; 1.2.26</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> * Build #27 1.2 -&gt; 1.2.27</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> */</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">async</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> function</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> increaseVersion</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">configPath</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> configText</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> await</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> fs.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">readFile</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(configPath, { encoding: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;utf-8&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> })</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  print</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">\`Changing \${</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">configPath</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">}\`</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> regex</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /</span><span style="--shiki-light:#032F62;--shiki-dark:#DBEDFF;">MARKETING_VERSION = (</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">.</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">+?</span><span style="--shiki-light:#032F62;--shiki-dark:#DBEDFF;">);</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">/</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">g</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> versionMatch</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> configText.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">match</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(regex)</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  if</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (versionMatch </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">===</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> null</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    throw</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> new</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> Error</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">\`Cant get iOS bundle version in \${</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">configPath</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">}, terminate build\`</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> bundleVersion</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> versionMatch[</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">].</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">replace</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;MARKETING_VERSION = &#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">).</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">replace</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;;&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> ciBuildNumber</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> process.env.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">CI_BUILD_NUMBER</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  if</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(ciBuildNumber </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">===</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> undefined</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    throw</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> new</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> Error</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;[changeAppInfo] CI_BUILD_NUMBER is required, but it&#39;s undefined&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> finalBundleVersion</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> \`\${</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">bundleVersion</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">}.\${</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">ciBuildNumber</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">}\`</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  print</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">\`Overwrite version: \${</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">bundleVersion</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">} -&gt; \${</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">finalBundleVersion</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">}\`</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> updatedConfigText</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> configText</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    .</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">replace</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(regex, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">\`MARKETING_VERSION = \${</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">finalBundleVersion</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">};\`</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  await</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> fs.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">writeFile</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(configPath, updatedConfigText, { encoding: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;utf-8&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> })</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">function</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> print</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">message</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  console.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">log</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">\`[changeAppInfo] \${</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">message</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">}\`</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">main</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">()</span></span></code></pre></div></div></div><h3 id="应用图标没有透明像素" tabindex="-1">应用图标没有透明像素 <a class="header-anchor" href="#应用图标没有透明像素" aria-label="Permalink to &quot;应用图标没有透明像素&quot;">​</a></h3><p>使用<code>Xcode Cloud</code>构建时, 应用图标不得有<code>alpha通道</code>, 其实就是不能有透明的像素. 你可以通过将应用图标转换为<code>jpeg</code>格式来解决这个问题, 因为<code>jpeg</code>格式的图片没有<code>alpha通道</code>.</p><h3 id="创建-github-仓库" tabindex="-1">创建 Github 仓库 <a class="header-anchor" href="#创建-github-仓库" aria-label="Permalink to &quot;创建 Github 仓库&quot;">​</a></h3><ol><li>创建一个<code>main</code>分支, 然后将这个分支上传<code>Github仓库</code>.</li><li>(可选)创建一个<code>build_ios</code>分支专门用于触发构建.</li></ol><h3 id="创建-xcode-cloud-workflow" tabindex="-1">创建 Xcode Cloud workflow <a class="header-anchor" href="#创建-xcode-cloud-workflow" aria-label="Permalink to &quot;创建 Xcode Cloud workflow&quot;">​</a></h3><ol><li>创建 <code>workflow</code> 的按钮在 <code>Xcode</code> &gt; <code>左侧导航栏</code> &gt; <code>最右边那个标签</code> &gt; <code>Cloud</code> &gt; <code>Get Started</code><img src="`+n+'" alt="picture 1"></li><li>创建过程中需要为 <code>workflow</code> 增加一个 <code>Archive</code> 类型的 <code>Action</code>. 其中 <code>Distribution Preparation</code> 需要选为 <code>App Store Connect</code>, 因为这个构建最终可能会被发布到 <code>App Store</code><img src="'+y+'" alt="picture 10"></li><li>首次设置需要授权 Xcode Cloud 访问 Github 仓库 <img src="'+u+'" alt="picture 0"></li><li>此时如果我们向 <code>Github仓库</code> 的 <code>main</code> 分支提交一个 <code>commit</code>, 应该就会触发 <code>Xcode Cloud</code> 的自动构建了. 你可以在 <a href="https://appstoreconnect.apple.com/" target="_blank" rel="noreferrer">App Store Connect &gt; Xcode Cloud</a> 观察构建过程.</li></ol><h3 id="构建完成后自动发布到-testflight" tabindex="-1">构建完成后自动发布到 TestFlight <a class="header-anchor" href="#构建完成后自动发布到-testflight" aria-label="Permalink to &quot;构建完成后自动发布到 TestFlight&quot;">​</a></h3><p>上述 <code>workflow</code> 配置了自动构建, 但是没有配置自动发布. 我们现在跳转到 <a href="https://appstoreconnect.apple.com/" target="_blank" rel="noreferrer">App Store Connect &gt; Xcode Cloud</a>.</p><p>打开要编辑的 <code>workflow</code>, 然后增加一个 <code>Post-Action</code>, 类型为 <code>TestFlight Internal Testing</code>. 选择你之前创建的测试组, 然后每次 <code>Xcode Cloud</code> 构建完成后就会自动发布到 <code>TestFlight</code> 了. <img src="'+f+'" alt="picture 9"></p><h2 id="参考材料" tabindex="-1">参考材料 <a class="header-anchor" href="#参考材料" aria-label="Permalink to &quot;参考材料&quot;">​</a></h2><ul><li><a href="https://developer.apple.com/documentation/xcode/configuring-your-first-xcode-cloud-workflow" target="_blank" rel="noreferrer">Configuring your first Xcode Cloud workflow | Apple</a></li></ul>',45);function D(i,B,_,x,v,q){return d(),t("div",null,[s("h1",C,[h(p(i.$frontmatter.title)+" ",1),A]),m])}const P=l(b,[["render",D]]);export{I as __pageData,P as default};
