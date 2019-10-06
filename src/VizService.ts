import * as d3 from 'd3';
import MiniVisualParams from './MiniVisualParams';
import reduceDataset from './reduceDataset';
import VisualizationProps from './commons/VisualizationProps';

interface DataProperties {
  minVal: number;
  maxVal: number;
}

export default class VizService {
  private params: MiniVisualParams;
  private rootSelector: string;
  private inputData: any[];
  private data: any[];
  private dataProps: DataProperties;

  constructor(data: any[], params: MiniVisualParams) {
    this.params = params;
    this.setData(data);
  }

  getData(): any[] {
    return this.data;
  }

  setData(data: any[]): void {
    if (!Array.isArray(data) || data.length <= 0) {
      throw new Error('Missing array-like data!');
    }
    this.inputData = data;
    this.data = data;
    this.dataProps = {
      minVal: d3.min<number>(this.data),
      maxVal: d3.max<number>(this.data),
    };
  }

  getDataLength(): number {
    return Array.isArray(this.data) && this.data.length > 0
      ? this.data.length
      : 1;
  }

  getDataProps(): DataProperties {
    return this.dataProps;
  }

  resolveSectionSize(xAxisSize: number, props: VisualizationProps): number {
    let sectionSize = (xAxisSize * 1.0) / this.getDataLength();
    let minSectionSize = sectionSize;

    if (props.minSectionSize > 0 && props.minSectionSize > sectionSize) {
      minSectionSize = props.minSectionSize;
    }
    if (
      props.maxSections > 0 &&
      props.maxSections < Math.floor(xAxisSize / minSectionSize)
    ) {
      minSectionSize = xAxisSize / props.maxSections;
    }

    if (minSectionSize > sectionSize) {
      sectionSize = (xAxisSize * 1.0) / Math.floor(xAxisSize / minSectionSize);
      this.fitToSectionSize(xAxisSize, sectionSize);
    }
    return sectionSize;
  }

  fitToSectionSize(xAxisSize: number, sectionSize: number): void {
    const maxSections = Math.floor(xAxisSize / sectionSize);

    if (maxSections < this.data.length) {
      this.data = reduceDataset(this.inputData, maxSections);
    }
  }
}
