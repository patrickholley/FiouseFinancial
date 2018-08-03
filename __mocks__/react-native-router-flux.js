class MockActions {
  constructor(scene) {
    this.currentScene = scene;
  }

  push = jest.fn();

  // not actual method in library - helper method
  setCurrentScene = scene => { this.currentScene = scene; }
}

module.exports = {
  Actions: new MockActions('login'),
};
