export default function findEnumNameOrValue<E>(
  enumerator: E,
  name: string | number,
  def?: any,
): E[keyof E] | null {
  const isString = typeof name === 'string';
  const clean = isString ? (name as string).trim().toLocaleUpperCase() : name;
  const keys = Object.keys(enumerator).filter(k => isNaN(Number(k)));

  for (const key in enumerator) {
    const val = enumerator[key];
    if (keys.includes(String(val))) continue;

    if (!isString && typeof val === 'number' && val === name) return val;

    if (isString) {
      if (key.toLocaleUpperCase() === clean) return enumerator[key];

      if (
        typeof enumerator[key] === 'string' &&
        String(enumerator[key]).toLocaleUpperCase() === clean
      )
        return enumerator[key];
    }
  }
  return typeof def === 'undefined' ? null : def;
}
