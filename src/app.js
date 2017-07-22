import React, { Component } from 'react';
import Canvas from 'components/canvas/pixi-canvas';
import 'assets/style/app.css';

class App extends Component {
  render() {
    return (
      <div className="App">
          <h1>SKELO interactive project</h1>
          <Canvas/>
      </div>
    );
  }
}

export default App;
