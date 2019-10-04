import d3 from 'd3';
import processDataset from './processDataset';

interface DataProperties {
  minVal: number,
  maxVal: number,
}

export default class VizService {
  private inputData;
  private data;
  private dataProps: DataProperties;

  constructor(data, params = {}) {
    //this.params = params;
    if (data) {
      this.setData(data);
    }
  }

  getData() {
    return this.data;
  }

  getDataProps(): DataProperties {
    return this.dataProps;
  }

  setData(data) {
    this.inputData = data;
    this.data = data;

    this.dataProps = {
      minVal: d3.min<number>(this.data),
      maxVal: d3.max<number>(this.data),
    }
    // this.data = processDataset(data, this.params);
  }

  getDataLength(): number {
    return Array.isArray(this.data) && this.data.length > 0
      ? this.data.length : 1;
  }

  resolveSectionSize(xAxisSize: number): number {
    return xAxisSize / this.getDataLength();
  }
}
