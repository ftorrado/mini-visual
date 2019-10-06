import AxisSettings, { defaultAxisSettings } from './AxisSettings';
import findEnumNameOrValue from './findEnumNameOrValue';
import LegendSettings from './LegendSettings';
import MiniVisualParams from '../MiniVisualParams';
import OrientationEnum from './OrientationEnum';
import ScaleEnum from './ScaleEnum';
import VizService from '../VizService';

interface VisualizationProps {
  params: MiniVisualParams;
  service: VizService;
  selector: string;
  styles: string;
  widthPx: number;
  heightPx: number;
  orientationEnum: OrientationEnum;
  scale: ScaleEnum;
  palette: string;
  legend: LegendSettings;
  maxSections?: number;
  minSectionSize?: number;
  xAxis: AxisSettings;
  yAxis: AxisSettings;
}

export default VisualizationProps;

export function translateToVisualizationProps(
  params: MiniVisualParams,
  selector: string,
  service: VizService,
  width: number,
  height: number,
): VisualizationProps {
  return {
    params,
    service: service,
    selector,
    styles: params.styles,
    widthPx: width,
    heightPx: height,
    orientationEnum: findEnumNameOrValue(OrientationEnum, params.orientation),
    scale: ScaleEnum.Linear,
    palette: params.palette,
    legend: params.legend || { labelPoints: false },
    maxSections: params.maxSections,
    minSectionSize: params.minSectionSize,
    xAxis: defaultAxisSettings(params.xAxis),
    yAxis: defaultAxisSettings(params.yAxis),
  };
  // TODO - pass axis settings
}
