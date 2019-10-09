import data from './_test_fixtures/dataNumericSimple';
import reduceDataset from './reduceDataset';

describe('reduceDataset()', () => {
  it('ignores section amount above the data points', () =>
    expect(JSON.stringify(reduceDataset(data, data.length + 2))).toEqual(
      JSON.stringify(data),
    ));

  it('reduces simple numeric data', () => {
    const avg = (d: number[]): number => d.reduce((v, c) => v + c) / d.length;
    expect(reduceDataset(data, 8)).toHaveLength(8);
    expect(avg(reduceDataset(data, 8))).toEqual(avg(data));
    expect(reduceDataset(data, 5)).toHaveLength(5);
    expect(avg(reduceDataset(data, 5))).toEqual(avg(data));
  });
});
