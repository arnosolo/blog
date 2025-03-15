import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: '/blog/',
  head: [['link', { rel: 'icon', href: '/blog/big-yellow.svg' }]],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: '/big-yellow.svg',
    nav: [
      { text: 'Home', link: '/' },
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/arnosolo/' }
    ],
    outline: [2, 3],
    // sidebar: [
    //   {
    //     text: 'Examples',
    //     items: [
    //       { text: 'Markdown Examples', link: '/markdown-examples' },
    //       { text: 'Runtime API Examples', link: '/api-examples' }
    //     ]
    //   }
    // ],
    // sidebar: {
    //   '/products/': [
    //     {
    //       text: 'Guide',
    //       items: [
    //         { text: 'Index', link: '/products/' },
    //         { text: 'One', link: '/products/one' },
    //         { text: 'Two', link: '/products/two' }
    //       ]
    //     }
    //   ],
    // }
  },
  locales: {
    root: {
      label: 'English',
      lang: 'en',
      title: "Arno's blog",
    },
    'zh-CN': {
      label: '简体中文',
      lang: 'zh-CN',
      link: '/zh-CN/',
      title: '阿诺的文章',
    }
  },
})
