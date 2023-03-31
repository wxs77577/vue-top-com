import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Vue Top Com",
  description: "Vue.js components loader.",
  base: '/vue-top-com',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Examples', link: '/examples' }
    ],

    sidebar: [
      {
        text: 'Setup',
        items: [
          { text: 'Installation', link: '/installation' },
        ]
      },
      
      {
        text: 'Compilers',
        items: [
          { text: 'Default Compiler', link: '/compilers/default' },
          { text: 'Template Compiler', link: '/compilers/template' }
        ]
      },

      {
        text: 'Plugins',
        items: [
          { text: 'API Plugin', link: '/plugins/api' },
          { text: 'CDN Plugin', link: '/plugins/cdn' },
          { text: 'Eval Plugin', link: '/plugins/eval' },
          { text: 'Url Loader Plugin', link: '/plugins/url-loader' },
        ]
      },
      {
        text: 'Advanced',
        items: [
          { text: 'Interfaces', link: '/advanced/interfaces' },
        ]
      },
      

    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/wxs77577/vue-top-com' }
    ],
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2023-present Johnny Wu'
    }
  }
})
