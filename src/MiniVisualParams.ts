import AxisSettings from './commons/AxisSettings';
import LegendSettings from './commons/LegendSettings';

interface MiniVisualParams {
  width?: number | string;
  height?: number | string;
  xAxis?: AxisSettings;
  yAxis?: AxisSettings;
  orientation?: string;
  palette?: string;
  styles?: string;
  legend?: LegendSettings;
  maxSections?: number;
  minSectionSize?: number;
}

export default MiniVisualParams;
