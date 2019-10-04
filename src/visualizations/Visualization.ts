import d3, { Selection } from 'd3';

import OrientationEnum from '../commons/OrientationEnum';
import VizService from '../VizService';

export interface Axis2D {
  x: d3.ScaleContinuousNumeric<any, any>;
  y: d3.ScaleContinuousNumeric<any, any>;
}

export interface VisualizationProps {
  name?: string;
  selector: string;
  vizService: VizService;
  width?: number;
  height?: number;
  orientation?: OrientationEnum;
  palette: string;
  //scale: ScaleEnum;
  styles: string;
}

export interface IVisualization {
  start(props?: VisualizationProps): void;
  draw(): void;
}

export default abstract class Visualization implements IVisualization {
  protected service: VizService;
  private selector: string;
  protected width: number;
  protected height: number;
  protected sectionSize: number;
  protected isHorizontal: boolean;
  protected axis: Axis2D;

  constructor(props: VisualizationProps) {
    this.initProps(props);
  }

  private initProps(props: VisualizationProps) {
    this.service = props.vizService;
    this.selector = props.selector;
    this.width = props.width || 250;
    this.height = props.height || 50;
    this.isHorizontal = props.orientation !== OrientationEnum.Vertical;
  }

  protected baseStart(implementation: Visualization, props?: VisualizationProps) {
    this.start(props);
    this.axis = {
      x: implementation.initAxisX(),
      y: implementation.initAxisY(),
    };
    implementation.draw();
  }

  start(props?: VisualizationProps) {
    if (props !== undefined) {
      this.initProps(props);
    }
    const xAxisSize = this.isHorizontal ? this.width : this.height;
    this.sectionSize = this.service.resolveSectionSize(xAxisSize);
  }

  protected initAxisX(): d3.ScaleContinuousNumeric<any, any> {
    throw new Error("Method not implemented.");
  }
  protected initAxisY(): d3.ScaleContinuousNumeric<any, any> {
    throw new Error("Method not implemented.");
  }

  draw(): void {
    throw new Error("Method not implemented.");
  }

  protected getD3Draw(containerTag?: string, elementsTag?: string): Selection<any, any, any, any> {
    return d3.select(this.selector)
      .selectAll(containerTag || 'div')
      .data(this.service.getData())
        .enter()
      .append(elementsTag || 'div');
  }
}
