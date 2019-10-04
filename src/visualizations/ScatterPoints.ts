import d3 from 'd3';

import Visualization, { IVisualization, VisualizationProps } from './Visualization';

export default class ScatterPoints extends Visualization implements IVisualization {
  constructor(props: VisualizationProps) {
    super(props);
    this.start();
  }

  start(props?: VisualizationProps) {
    super.baseStart(this, props);
  }

  initAxisX(): d3.ScaleContinuousNumeric<any, any> {
    const dataLength = this.service.getDataLength();
    const xAxisSize = this.isHorizontal ? this.width : this.height;

    return d3.scaleLinear()
      .domain([0, dataLength])
      .range([0, xAxisSize]);
  }

  initAxisY(): d3.ScaleContinuousNumeric<any, any> {
    const dataProps = this.service.getDataProps();
    const yAxisSize = this.isHorizontal ? this.width : this.height;

    return d3.scaleLinear()
      .domain([dataProps.minVal, dataProps.maxVal])
      .range([0, yAxisSize])
      .nice();
  }

  draw() {
    const drawFunc = super.getD3Draw('svg', 'circle');
    // TODO
  }
}
