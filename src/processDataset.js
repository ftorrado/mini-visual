import d3 from 'd3';

function processDataset(data, { scale = 'linear', range }) {
  if (scale === 'linear') {
    const dataMin = d3.min(data);
    const dataMax = d3.max(data);
    return d3.scale
      .linear()
      .domain([dataMin, dataMax])
      .range([
        range && typeof range.min === 'number' ? range.min : dataMin,
        range && typeof range.max === 'number' ? range.max : dataMax,
      ]);
  }
  throw new Error(`${scale} is not a valid data scale`);
}

export default processDataset;
