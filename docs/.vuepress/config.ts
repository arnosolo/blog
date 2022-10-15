import { defaultTheme, defineUserConfig } from 'vuepress'

export default defineUserConfig({
  title: "Arno's Documents",
  description: "Public documents of Arno Solo",
  theme: defaultTheme({
    logo: 'logo.svg',
    locales: {
      '/': {
        selectLanguageName: 'English',
      },
      '/zh/': {
        selectLanguageName: '简体中文',
      },
    },
  }),
  base: `/my-public-docs/`,
  locales: {
    '/': {
      lang: 'en-US',
      title: 'Arno\'s Documents',
      description: 'Public documents of Arno Solo',
    },
    '/zh/': {
      lang: 'zh-CN',
      title: '阿诺的文档',
      description: '孤独阿诺的公开文档',
    },
  }
})
