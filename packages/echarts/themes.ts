interface EChartThemeOption {
  fontColor: string
  lineColor: string
  palette: string[]
}

const lightFontColor = '#171717'
const lightLineColor = '#e5e5e5'
const lightPalette = [
  '#3A8BFF',
  '#00C3C6',
  '#F35A6D',
  '#FAAE00',
  '#F27E57',
  '#AB7DE6',
  '#3BADF2',
  '#3BCE7D',
  '#F66AB3',
  '#40A6D2',
  '#8FCF55',
  '#746BEC',
]

const darkFontColor = '#f5f5f5'
const darkLineColor = '#404040'
const darkPalette = [
  '#5DA6FF',
  '#26D1CF',
  '#F57580',
  '#FFCD58',
  '#F59873',
  '#BB91EB',
  '#5CBFF5',
  '#59D88E',
  '#F883BB',
  '#5DB9DB',
  '#A5D96F',
  '#8E83F0',
]

export function useEChartTheme(options?: Partial<EChartThemeOption>) {
  const {
    fontColor = lightFontColor,
    lineColor = lightLineColor,
    palette = lightPalette,
  } = options ?? {}
  return {
    legend: {
      textStyle: {
        fontSize: 12,
        color: fontColor,
      }
    },
    grid: {
      bottom: 50,
      top: 50,
      left: 20,
      right: 40,
      containLabel: true,
    },
    categoryAxis: {
      axisLine: {
        lineStyle: {
          color: lineColor,
        }
      },
      axisLabel: {
        color: fontColor,
      },
      axisTick: {
        lineStyle: {
          color: lineColor,
        }
      },
      axisPointer: {
        label: {
          backgroundColor: lineColor,
        }
      }
    },
    valueAxis: {
      splitLine: {
        lineStyle: {
          color: [lineColor]
        }
      },
      axisLabel: {
        color: fontColor,
      },
      axisPointer: {
        label: {
          backgroundColor: lineColor,
        }
      }
    },
    visualMap: {
      inRange: {
        color: [palette[0], palette[3]]
      }
    },
    tooltip: {
      backgroundColor: 'rgba(60, 63, 70, 0.7)',
      borderWidth: 0,
      textStyle: {
        color: '#fff',
        fontFamily: 'Microsoft YaHei',
        lineHeight: 20,
        fontSize: 12,
        axisPointer: {
          shadowStyle: { color: 'rgba(153, 153, 153, 0.2)' },
        },
        extraCssText: 'box-shadow: 0px 1px 9px 0px rgba(0,0,0,0.1); border-radius: 8px; border: 0.5px solid #FFFFFF 0.16;'
      },
      axisPointer: {
        shadowStyle: {
          color: 'rgba(34, 34, 34, 0.06)'
        }
      }
    },
    line: {
      itemStyle: {
        borderWidth: 2
      },
      lineStyle: {
        width: 2
      },
      symbolSize: 5,
      symbol: 'circle',
      smooth: true,
    },
    cursor: 'default',
    color: palette,
  }
}

export const lightTheme = useEChartTheme()
export const darkTheme = useEChartTheme({
  fontColor: darkFontColor,
  lineColor: darkLineColor,
  palette: darkPalette,
})
