import VizService from './VizService';

import Visualization, { VisualizationProps } from './visualizations/Visualization';
import visualizations from './visualizations/index';

export interface MiniVisualProperties {
  selector: string,
  type?: string,
  data: Array<any>,
  params: VisualizationProps,
}

export default class MiniVisual {
  domContainer: Element;
  service: VizService;
  visualization: Visualization;

  constructor(props: MiniVisualProperties) {
    // get DOM container
    if (typeof props.selector === 'undefined' || !props.selector.length) {
      throw new Error('No valid selector given');
    }
    this.domContainer = document.querySelector(props.selector);
    if (this.domContainer == null) {
      throw new Error('No container found for the selector given');
    }

    this.service = new VizService(props.data, props.params);
    this.visualization = this.getVisualization(props.type || null, props.params);
    this.render();
  }

  getVisualization(type: string | null, params) {
    if (typeof this.visualization !== 'undefined')
      return this.visualization;

    // switch (this.type) {}
    return new visualizations.ColorCodedBar({
      ...params,
      service: this.service,
    });
  }

  render() {
    this.visualization.start();
  }

  /**
   * Stop and remove the visualization instance
   */
  destroy() {
    // TODO
  }
}
