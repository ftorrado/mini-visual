function reduceDataset(data: any[], maxSections: number): any[] {
  if (maxSections >= data.length) return data.slice();

  const dataProcessed = [];
  const dataWeight = maxSections / (data.length * 1.0);
  //console.log(dataWeight);

  let currValue = 0;
  let weightCounter = 0;

  for (let i = 0; i < data.length; i++) {
    //console.log(i, data[i], weightCounter, currValue, dataProcessed);
    if (weightCounter + dataWeight >= 1 || i === data.length - 1) {
      const partialWeight = 1 - weightCounter;
      dataProcessed.push(currValue + data[i] * partialWeight);
      weightCounter = dataWeight - partialWeight;
      currValue = data[i] * weightCounter;
    } else {
      currValue += data[i] * dataWeight;
      weightCounter += dataWeight;
    }
    //console.log(i, data[i], weightCounter, currValue, dataProcessed);
  }

  return dataProcessed;
}

export default reduceDataset;
