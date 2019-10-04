export default function checkRequired(requiredVar, { acceptedValues, defaultValue }) {
  const hasDefault = typeof defaultValue !== 'undefined';
  const hasVar = typeof requiredVar !== 'undefined';

  // check if fulfills requirements
  if (!hasDefault && !hasVar) {
    throw new MissingArgError();
  }
  else if (hasVar && Array.isArray(acceptedValues) &&
      acceptedValues.findIndex(requiredVar) < 0) {
    throw new InvalidArgError();
  }

  // return value or default
  if (hasDefault && !hasVar) {
    return defaultValue;
  } else {
    return requiredVar;
  }
}
