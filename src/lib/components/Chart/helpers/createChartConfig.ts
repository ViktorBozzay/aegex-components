import { ChartTypeRegistry } from 'chart.js';

export const createChartConfig = ({
  type,
  data,
  legendPosition,
  chartTitle,
  maxValue,
}: {
  type: keyof ChartTypeRegistry;
  data: any;
  legendPosition: string;
  chartTitle: string;
  maxValue?: number;
}) => {
  const yScale = maxValue
    ? {
        type: 'linear',
        stacked: false,
        min: 0,
        max: Math.ceil(maxValue * 0.12) * 10,
        grid: {
          display: true,
          color: 'rgba(255,99,132,0.2)',
        },
      }
    : {};

  const defaultChartConfig = {
    type: type as string,
    data,
    options: {
      scales: {
        // y: yScale,
        // x: {
        //   type: 'linear',
        //   max: data.labels.length,
        //   grid: {
        //     display: true,
        //     color: 'rgba(255,99,132,0.2)',
        //   },
        // },
      },
      layout: {
        padding: 10,
      },
      plugins: {
        legend: {
          position: legendPosition as 'top' | 'right' | 'bottom' | 'left' | 'center' | 'chartArea',
        },
        title: {
          display: true,
          text: chartTitle,
          font: { size: 18 },
        },
        // TODO: This doesn't works (connection with next TODO)
        // setBackground: {
        //   color: chartBackgroundColor,
        // },
      },
    },
  };

  return defaultChartConfig;
};
