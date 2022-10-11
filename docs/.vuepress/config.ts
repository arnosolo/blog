import { defaultTheme, defineUserConfig } from 'vuepress'

export default defineUserConfig({
  title: "Arno's Documents",
  description: "Public documents of Arno Solo",
  theme: defaultTheme({
    logo: 'logo.svg',
  }),
  base: `/my-public-docs/`,
})
