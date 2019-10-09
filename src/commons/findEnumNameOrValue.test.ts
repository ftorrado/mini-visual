import findEnumNameOrValue from './findEnumNameOrValue';

enum TestEnumNumeric {
  bar = 0,
  foo,
}

enum TestEnumString {
  bar = 'B',
  foo = 'F',
}

enum TestEnumMixed {
  bar = 0,
  foo = 'F',
}

describe('findEnumNameOrValue()', () => {
  it('finds for numeric enum', () => {
    expect(findEnumNameOrValue(TestEnumNumeric, 'bar')).toEqual(
      TestEnumNumeric.bar,
    );
    expect(findEnumNameOrValue(TestEnumNumeric, 'bee')).toEqual(null);
    expect(findEnumNameOrValue(TestEnumNumeric, 1)).toEqual(
      TestEnumNumeric.foo,
    );
  });
  it('finds for string enum', () => {
    expect(findEnumNameOrValue(TestEnumString, 'bar')).toEqual(
      TestEnumString.bar,
    );
    expect(findEnumNameOrValue(TestEnumString, 'B')).toEqual(
      TestEnumString.bar,
    );
    expect(findEnumNameOrValue(TestEnumString, 'bee')).toEqual(null);
    expect(findEnumNameOrValue(TestEnumString, 'F')).toEqual(
      TestEnumString.foo,
    );
  });
  it('finds for mixed enum', () => {
    expect(findEnumNameOrValue(TestEnumMixed, 'bar')).toEqual(
      TestEnumMixed.bar,
    );
    expect(findEnumNameOrValue(TestEnumMixed, 0)).toEqual(TestEnumMixed.bar);
    expect(findEnumNameOrValue(TestEnumMixed, 'bee')).toEqual(null);
    expect(findEnumNameOrValue(TestEnumMixed, 'F')).toEqual(TestEnumMixed.foo);
  });

  it('always ignores case', () => {
    expect(findEnumNameOrValue(TestEnumNumeric, 'BaR')).toEqual(0);
    expect(findEnumNameOrValue(TestEnumString, 'f')).toEqual(TestEnumMixed.foo);
    expect(findEnumNameOrValue(TestEnumString, 'FOO')).toEqual(
      TestEnumMixed.foo,
    );
    expect(findEnumNameOrValue(TestEnumMixed, 'bEe')).toEqual(null);
    expect(findEnumNameOrValue(TestEnumMixed, 'FOO')).toEqual(
      TestEnumMixed.foo,
    );
  });
  it('returns default if defined', () => {
    expect(findEnumNameOrValue(TestEnumNumeric, 'what', -1)).toEqual(-1);
    expect(findEnumNameOrValue(TestEnumString, 'fax', 'tax')).toEqual('tax');
    expect(findEnumNameOrValue(TestEnumMixed, 'X', 'Z')).toEqual('Z');
  });
});
