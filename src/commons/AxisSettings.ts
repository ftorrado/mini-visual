import findEnumNameOrValue from './findEnumNameOrValue';
import ScaleEnum from './ScaleEnum';

interface AxisSettings {
  clamp: boolean;
  exact: boolean;
  domain?: number[];
  range?: (string | number)[];
  palette?: string;
  baseline?: number;
  scale?: ScaleEnum;
  interpolate?: Function;
}

export default AxisSettings;

export function createAxisSettings(
  domain?: number[],
  range?: (string | number)[],
  clamp = false,
  exact = false,
  palette = 'grayscale',
  baseline?: number,
  scale?: ScaleEnum,
  interpolate?: Function,
): AxisSettings {
  return { domain, range, clamp, exact, palette, baseline, scale, interpolate };
}

export function defaultAxisSettings(axis?: any): AxisSettings {
  const { domain, range, clamp, exact, palette, baseline, scale, interpolate } =
    axis || {};
  const enumScale =
    typeof scale === 'string' ? findEnumNameOrValue(ScaleEnum, scale) : scale;
  return createAxisSettings(
    domain,
    range,
    clamp,
    exact,
    palette,
    baseline,
    enumScale,
    interpolate,
  );
}
