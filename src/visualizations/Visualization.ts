import * as d3 from 'd3';

import OrientationEnum from '../commons/OrientationEnum';
import VisualizationEnum from '../commons/VisualizationEnum';
import VisualizationProps from '../commons/VisualizationProps';
import VizService from '../VizService';

export interface Axis2D {
  x: d3.ScaleContinuousNumeric<any, any>;
  y: d3.ScaleContinuousNumeric<any, any>;
}

export interface Visualizable {
  start(props?: VisualizationProps): void;
  draw(): void;
  getType(): VisualizationEnum;
}

export default abstract class Visualization {
  protected service: VizService;
  private selector: string;
  protected props: VisualizationProps;
  protected width: number;
  protected height: number;
  protected sectionSize: number;
  protected isHorizontal: boolean;
  protected axis: Axis2D;

  constructor(props: VisualizationProps) {
    this.initProps(props);
  }

  private initProps(props: VisualizationProps): void {
    this.service = props.service;
    this.selector = props.selector;
    this.props = props;
    this.width = props.widthPx;
    this.height = props.heightPx;
    this.isHorizontal = props.orientationEnum !== OrientationEnum.Vertical;
  }

  protected baseStart(
    implementation: Visualization,
    props?: VisualizationProps,
  ): void {
    if (typeof props !== 'undefined') {
      this.initProps(props);
    }

    const xAxisSize = this.isHorizontal ? this.width : this.height;
    this.sectionSize = this.service.resolveSectionSize(xAxisSize, this.props);

    this.axis = {
      x: implementation.initAxisX(),
      y: implementation.initAxisY(),
    };
    implementation.draw();
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  start(props?: VisualizationProps): void {
    throw new Error('Method not implemented.');
  }

  protected initAxisX(): d3.ScaleContinuousNumeric<any, any> {
    throw new Error('Method not implemented.');
  }
  protected initAxisY(): d3.ScaleContinuousNumeric<any, any> {
    throw new Error('Method not implemented.');
  }

  draw(): void {
    throw new Error('Method not implemented.');
  }

  protected getD3Draw(
    containerTag?: string,
    elementsTag?: string,
  ): d3.Selection<any, any, any, any> {
    return d3
      .select(this.selector)
      .selectAll(containerTag || 'div')
      .data(this.service.getData())
      .enter()
      .append(elementsTag || 'div');
  }
}
