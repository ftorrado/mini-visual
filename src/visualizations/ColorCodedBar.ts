import d3 from 'd3';

import Visualization, { IVisualization, VisualizationProps, Axis2D } from './Visualization';

export default class ColorCodedBar extends Visualization implements IVisualization {
  constructor(props: VisualizationProps) {
    super(props);
    this.start();
  }

  start(props?: VisualizationProps) {
    super.baseStart(this, props);
  }

  initAxisY() {
    const dataProps = this.service.getDataProps();

    return d3.scaleLinear<string, number>()
      .domain([dataProps.minVal, dataProps.maxVal])
      .range(['#fff', '#000'])
      .nice();
  }

  draw() {
    const drawFunc = super.getD3Draw();

    if (this.isHorizontal) {
      drawFunc
        .style('width', () => `${this.sectionSize}px`)
        .style('left', (d) => `${this.axis.x(d)}px`);
    }
    else {
      drawFunc
        .style('height', () => `${this.sectionSize}px`)
        .style('top', (d) => `${this.axis.x(d)}px`);
    }

    this.drawColor(drawFunc);
    this.drawLabels(drawFunc);
  }

  private drawColor(drawFunc) {
    drawFunc
      .style('background-color', (d) => this.axis.y(d));
  }

  private drawLabels(drawFunc) {
    drawFunc
      .style('color', (d) => (this.axis.y(d) > '#555' ? '#000' : '#FFF'))
      .text((d) => Math.round(d));
  }
}
