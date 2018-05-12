export const propByKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

export const authCondition = (authUser) => !!authUser;