import VisualizationProps, {
  translateToVisualizationProps,
} from './commons/VisualizationProps';
import ColorCodedBar from './visualizations/ColorCodedBar';
import findEnumNameOrValue from './commons/findEnumNameOrValue';
import MiniVisualParams from './MiniVisualParams';
import Visualization from './visualizations/Visualization';
import VisualizationEnum from './commons/VisualizationEnum';
import VizService from './VizService';

export interface MiniVisualProperties {
  selector: string;
  name?: string;
  type?: string;
  data: any[];
  params: MiniVisualParams;
}

export default class MiniVisual {
  private type: VisualizationEnum;
  private selector: string;
  private domContainer: HTMLElement;
  private name?: string;
  private service: VizService;
  private visualization: Visualization;
  private params: MiniVisualParams;
  private width: number;
  private height: number;

  constructor(props: MiniVisualProperties) {
    this.type = findEnumNameOrValue(
      VisualizationEnum,
      props.type || 'ColorCodedBar',
    );
    this.selector = props.selector;
    this.name = props.name;
    this.params = props.params;

    // get DOM container
    if (typeof props.selector === 'undefined' || !props.selector.length) {
      throw new Error('No valid selector given');
    }
    this.domContainer = document.querySelector(props.selector);
    if (this.domContainer == null) {
      throw new Error('No container found for the selector given');
    }

    this.render(props.data, props.params);
  }

  private setup(data: any[], params: MiniVisualParams): void {
    this.service = new VizService(data, params);
    const visualizationProps = translateToVisualizationProps(
      params,
      this.selector,
      this.service,
      this.width,
      this.height,
    );
    this.visualization = this.setupVisualization(this.type, visualizationProps);
  }

  private setupVisualization(
    type: VisualizationEnum,
    visualizationProps: VisualizationProps,
  ): Visualization {
    // TODO
    // switch (this.type) {}
    return new ColorCodedBar(visualizationProps);
  }

  private adjustSize(): void {
    const providedWidth = this.params.width;
    const providedHeight = this.params.height;

    if (typeof providedWidth === 'number') {
      this.domContainer.style.width = `${providedWidth}px`;
    } else if (typeof providedWidth !== 'undefined') {
      this.domContainer.style.width = providedWidth;
    }
    this.width = this.domContainer.clientWidth;

    if (typeof providedHeight === 'number') {
      this.domContainer.style.height = `${providedHeight}px`;
    } else if (typeof providedHeight !== 'undefined') {
      this.domContainer.style.height = providedHeight;
    }
    this.height = this.domContainer.clientHeight;
  }

  getVisualization(): Visualization {
    return this.visualization;
  }

  /**
   * Render or refresh the MiniVisual component
   * @param data New data to display
   */
  render(data?: any[], paramsOverload?: MiniVisualParams): void {
    this.adjustSize();
    if (typeof data !== 'undefined' && typeof paramsOverload !== 'undefined') {
      this.params = Object.assign({}, this.params, paramsOverload);
      this.setup(data, this.params);
    } else if (typeof data !== 'undefined') {
      this.service.setData(data);
    }
    this.visualization.start();
  }

  /**
   * Stop and remove the visualization instance
   */
  destroy(): void {
    // TODO
    throw new Error('Method not implemented.');
  }
}
