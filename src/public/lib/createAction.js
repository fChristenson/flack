const createAction = type => value => {
  return {
    type,
    value
  };
};

module.exports = createAction;
