import Chart, { ChartComponentLike } from 'chart.js/auto';

export const setChartBackground = (backgroundColor: string) => {
  const setBackgroundPlugin: ChartComponentLike = {
    id: 'setBackground',
    beforeDraw: (chart, args, options) => {
      const { ctx } = chart;
      ctx.save();
      ctx.globalCompositeOperation = 'destination-over';
      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, chart.width, chart.height);
      ctx.restore();
    },
  };
  Chart.register([setBackgroundPlugin]);
};
