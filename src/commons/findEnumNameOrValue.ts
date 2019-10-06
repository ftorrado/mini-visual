export default function findEnumNameOrValue<E>(
  enumerator: E,
  name: string | number,
  def?: E[keyof E],
): E[keyof E] | null {
  if (typeof enumerator[name] !== 'undefined') return enumerator[name];

  const isString = typeof name === 'string';
  const clean = isString ? (name as string).trim().toLocaleUpperCase() : name;

  for (const key in enumerator) {
    const isNumProperty = parseInt(key, 10) >= 0;
    if (
      (isString && !isNumProperty && key.toLocaleUpperCase() === clean) ||
      (!isString && isNumProperty && parseInt(key, 10) === clean) ||
      (isString && String(enumerator[key]) === clean)
    )
      return enumerator[key];
  }
  return typeof def === 'undefined' ? null : def;
}
