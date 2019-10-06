import * as d3 from 'd3';
import Visualization, { Visualizable } from './Visualization';
import findEnumNameOrValue from '../commons/findEnumNameOrValue';
import PaletteEnum from '../commons/PaletteEnum';
import VisualizationEnum from '../commons/VisualizationEnum';
import VisualizationProps from '../commons/VisualizationProps';

export default class ColorCodedBar extends Visualization
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

  initAxisY(): d3.ScaleContinuousNumeric<string, number> {
    const dataProps = this.service.getDataProps();

    let axis = d3.scaleLinear<string, number>();

    // domain
    const hasDomain =
      Array.isArray(this.props.yAxis.domain) &&
      this.props.yAxis.domain.length === 2;
    const minVal = hasDomain ? this.props.yAxis.domain[0] : dataProps.minVal;
    const maxVal = hasDomain ? this.props.yAxis.domain[1] : dataProps.maxVal;
    if (typeof this.props.yAxis.baseline === 'number') {
      axis = axis.domain([minVal, this.props.yAxis.baseline, maxVal]);
    } else {
      axis = axis.domain([minVal, maxVal]);
    }

    // range
    if (
      Array.isArray(this.props.yAxis.range) &&
      this.props.yAxis.range.length > 0
    ) {
      const customRange = this.props.yAxis.range;
      if (customRange.every(v => typeof v === 'string')) {
        axis = axis.range(this.props.yAxis.range as string[]);
      } else {
        console.warn('Invalid yAxis range for ColorCodedBar, must be a color');
      }
    } else {
      switch (findEnumNameOrValue(PaletteEnum, this.props.yAxis.palette)) {
        case PaletteEnum.heatmap:
          axis = axis.range(['#138', '#ffd', '#a01']);
          break;
        case PaletteEnum.heatmap2:
          axis = axis.range(['#22f', '#eee', '#d10']);
          break;
        case PaletteEnum.grayscale:
        default:
          axis = axis.range(['#fff', '#000']);
          break;
      }
    }

    axis = axis.clamp(this.props.yAxis.clamp);
    if (!this.props.yAxis.exact) axis = axis.nice();

    return axis;
  }

  draw(): void {
    const drawFunc = super.getD3Draw();

    if (this.isHorizontal) {
      drawFunc.style('width', () => `${this.sectionSize}px`);
      //.style('left', (d) => `${this.axis.x(d)}px`);
    } else {
      drawFunc.style('height', () => `${this.sectionSize}px`);
      //.style('top', d => `${this.axis.x(d)}px`);
    }

    this.drawColor(drawFunc);
    if (this.props.legend.labelPoints) this.drawLabels(drawFunc);
  }

  private drawColor(drawFunc): d3.Selection<any, any, any, any> {
    return drawFunc.style('background-color', d => this.axis.y(d));
  }

  private drawLabels(drawFunc): d3.Selection<any, any, any, any> {
    return drawFunc
      .style('color', d => (d3.hsl(this.axis.y(d)).l > 0.6 ? '#000' : '#FFF'))
      .text(d => Math.round(d));
  }

  getType(): VisualizationEnum {
    return VisualizationEnum.ColorCodedBar;
  }
}
