export const propByKey = (propertyName, value) => () => ({
  [propertyName]: value,
});