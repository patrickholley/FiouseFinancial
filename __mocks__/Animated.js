class MockAnimatedValue {
  constructor(baseValue = 0) {
    this.baseValue = baseValue;
  }
}

module.exports = {
  Value: MockAnimatedValue,
  timing: () => ({ start: () => {} }),
};
