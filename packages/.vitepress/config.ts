import { type DefaultTheme, defineConfig } from 'vitepress'
import Sidebar = DefaultTheme.Sidebar

const echartsSidebar: Sidebar = [
  {
    text: 'Basic',
    items: [
      { text: 'Introduction', link: '/echarts/docs/' },
      { text: 'Quick Start', link: '/echarts/docs/quick-start' },
      { text: 'Dimensions & Metrics', link: '/echarts/docs/dimensions-and-metrics' },
      { text: 'Add-ons', link: '/echarts/docs/addons' },
    ]
  },
  {
    text: 'Add-ons',
    items: [
      {
        text: 'Axis',
        items: [
          { text: 'useYAxisAsDimension', link: '/echarts/addons/useYAxisAsDimension/' },
        ]
      },
      {
        text: 'Bar',
        items: [
          { text: 'useBarStack', link: '/echarts/addons/useBarStack/' },
        ]
      },
      {
        text: 'Line',
        items: [
          { text: 'useLineArea', link: '/echarts/addons/useLineArea/' },
        ]
      },
      {
        text: 'Pie',
        items: [
          { text: 'useDoughnut', link: '/echarts/addons/useDoughnut/' },
        ]
      },
      {
        text: 'Radar',
        items: [
          { text: 'useRadarArea', link: '/echarts/addons/useRadarArea/' },
        ]
      },
    ]
  }
]

export default defineConfig({
  outDir: '../docs',
  title: 'ECharts Composables',
  description: 'A composables implementation of ECharts',
  head: [
    ['link', { rel: 'icon', href: 'https://dsviews.datastory.com.cn/static/favicon.ico' }],
    ['link', { rel: 'stylesheet', href: '/index.css' }],
  ],
  themeConfig: {
    nav: [
      { text: '指南', link: '/echarts/docs/' },
      { text: '更新日志', link: 'https://github.com/ryancui92/echarts-composables/releases' },
      { text: '演练场', link: 'https://echarts.ryancui.com/playground/#/' }
    ],
    sidebar: {
      '/echarts/': echartsSidebar,
    },
    footer: {
      copyright: 'Copyright © 2022-present Ryan Cui'
    }
  }
})
