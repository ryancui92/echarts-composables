# EChart Option Composables

如题，这是一个 Composable 的方式对 EChart 的 option 再进行一次封装，进一步提高开发效率。

## Design Principles

- Fast & Simple
- Dimensions & Metrics First
- Declarative & Reusable Add-ons ecosystem

## Motivation

在基于 EChart 做可视化图表时，常常会遇到下面的问题

1. 一个看上去非常简单的图表，也需要反复查找 EChart 的 option 文档，逐一配置
2. 五花八门的数据适配与转换，`series.data`, `legend.data`, `tooltip` 等各种配置都需要转换 data
3. 一模一样的图，换一个开发人员，换一个团队做出来的效果不完全一致，`grid`, `axis` 的配置可能并不明确，互相之间无法对齐

因此我们打算通过 `echarts-composables` 解决上面的问题。我们相信，一套默认、简单的 option 就足以应付 80% 的可视化场景。如果实在有定制的图表需求，基于一个已有的 option 进行修改也总比从头开始写一个更快。

我们专注于 EChart option 的生成上，我们建议配合 [vue-echarts](https://github.com/ecomfe/vue-echarts) 使用。
