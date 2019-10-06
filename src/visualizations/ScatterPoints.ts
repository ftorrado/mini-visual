import * as d3 from 'd3';
import Visualization, { Visualizable } from './Visualization';
import VisualizationEnum from '../commons/VisualizationEnum';
import VisualizationProps from '../commons/VisualizationProps';

export default class ScatterPoints extends Visualization
  implements Visualizable {
  constructor(props: VisualizationProps) {
    super(props);
    this.start();
  }

  start(props?: VisualizationProps): void {
    super.baseStart(this, props);
  }

  initAxisX(): d3.ScaleContinuousNumeric<number, number> {
    const dataLength = this.service.getDataLength();
    const xAxisSize = this.isHorizontal ? this.width : this.height;

    return d3
      .scaleLinear()
      .domain([0, dataLength])
      .range([0, xAxisSize]);
  }

  initAxisY(): d3.ScaleContinuousNumeric<number, number> {
    const dataProps = this.service.getDataProps();
    const yAxisSize = this.isHorizontal ? this.width : this.height;

    return d3
      .scaleLinear()
      .domain([dataProps.minVal, dataProps.maxVal])
      .range([0, yAxisSize])
      .nice();
  }

  draw(): void {
    super.getD3Draw('svg', 'circle');
    // TODO
  }

  getType(): VisualizationEnum {
    return VisualizationEnum.ScatterPoints;
  }
}
