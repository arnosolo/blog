import{_ as t,o as p,c as e,a as n,b as o,t as a,e as c}from"./app.2e79e836.js";const i={},l={id:"frontmatter-title",tabindex:"-1"},r=n("a",{class:"header-anchor",href:"#frontmatter-title","aria-hidden":"true"},"#",-1),u=c(`<div class="language-typescript ext-ts line-numbers-mode"><pre class="language-typescript"><code><span class="token keyword">interface</span> <span class="token class-name">PhotoSpec</span> <span class="token punctuation">{</span>
    width<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">;</span>
    height<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">;</span>
    unit<span class="token operator">:</span> <span class="token string">&#39;mm&#39;</span> <span class="token operator">|</span> <span class="token string">&#39;inch&#39;</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">type</span> <span class="token class-name">PhotoSpecId</span> <span class="token operator">=</span>
    <span class="token string">&#39;australia-passport&#39;</span> <span class="token operator">|</span>
    <span class="token string">&#39;japan-passport&#39;</span> <span class="token operator">|</span>
    <span class="token string">&#39;japan-resume&#39;</span><span class="token punctuation">;</span>


<span class="token keyword">const</span> PhotoSpecListObj<span class="token operator">:</span> Record<span class="token operator">&lt;</span>PhotoSpecId<span class="token punctuation">,</span> PhotoSpec<span class="token operator">&gt;</span> <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token string-property property">&#39;australia-passport&#39;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        width<span class="token operator">:</span> <span class="token number">35</span><span class="token punctuation">,</span>
        height<span class="token operator">:</span> <span class="token number">45</span><span class="token punctuation">,</span>
        unit<span class="token operator">:</span> <span class="token string">&#39;inch&#39;</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token string-property property">&#39;japan-passport&#39;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        width<span class="token operator">:</span> <span class="token number">35</span><span class="token punctuation">,</span>
        height<span class="token operator">:</span> <span class="token number">45</span><span class="token punctuation">,</span>
        unit<span class="token operator">:</span> <span class="token string">&#39;mm&#39;</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token string-property property">&quot;japan-resume&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        width<span class="token operator">:</span> <span class="token number">35</span><span class="token punctuation">,</span>
        height<span class="token operator">:</span> <span class="token number">45</span><span class="token punctuation">,</span>
        unit<span class="token operator">:</span> <span class="token string">&#39;mm&#39;</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">printPhotoSpecList</span><span class="token punctuation">(</span>PhotoSpecListObj<span class="token operator">:</span> Record<span class="token operator">&lt;</span>PhotoSpecId<span class="token punctuation">,</span> PhotoSpec<span class="token operator">&gt;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    Object<span class="token punctuation">.</span><span class="token function">values</span><span class="token punctuation">(</span>PhotoSpecListObj<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span>spec <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>spec<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,1);function d(s,k){return p(),e("div",null,[n("h1",l,[r,o(" "+a(s.$frontmatter.title),1)]),n("p",null,a(s.$frontmatter.description),1),u])}const m=t(i,[["render",d],["__file","how-to-save-key-value-using-js-object.html.vue"]]);export{m as default};
