interface AxisSettings {
  clamp: boolean;
  exact: boolean;
  domain?: number[];
  range?: (string | number)[];
  palette?: string;
  baseline?: number;
}

export default AxisSettings;

export function createAxisSettings(
  domain?: number[],
  range?: (string | number)[],
  clamp = false,
  exact = false,
  palette = 'grayscale',
  baseline?: number,
): AxisSettings {
  return { domain, range, clamp, exact, palette, baseline };
}

export function defaultAxisSettings(axis?: AxisSettings): AxisSettings {
  const { domain, range, clamp, exact, palette, baseline } = axis || {};
  return createAxisSettings(domain, range, clamp, exact, palette, baseline);
}
