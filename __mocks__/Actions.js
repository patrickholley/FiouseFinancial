export default class MockActions {
  constructor(params = {}) {
    this.currentParams = params;
  }

  push = jest.fn();

  // not actual method in library - helper method
  setCurrentParams = params => { this.currentParams = params; }
}
