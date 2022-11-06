import { defaultTheme, defineUserConfig } from 'vuepress'

export default defineUserConfig({
  base: `/blog/`,
  head: [
    [
      'link', { rel: 'icon', href: '/blog/logo.svg'}
    ]
  ],
  theme: defaultTheme({
    logo: 'logo.svg',
    logoDark: 'logo-dark.svg',
    locales: {
      '/': {
        selectLanguageName: 'English',
      },
      '/zh/': {
        selectLanguageName: '简体中文',
      },
    },
  }),
  locales: {
    '/': {
      lang: 'en-US',
      title: 'Arno\'s blog',
      description: 'Public documents of Arno Solo',
    },
    '/zh/': {
      lang: 'zh-CN',
      title: '阿诺的博客',
      description: '孤独阿诺的公开文档',
    },
  }
})
