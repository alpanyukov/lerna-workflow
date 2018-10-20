import React, { Component } from 'react';
import { Button } from '@ap/components';
import './App.css';

class App extends Component {
  state = {
    message: ''
  };

  componentDidMount() {
    fetch('http://localhost:8080/')
      .then(r => r.json())
      .then(({ message }) => this.setState({ message }));
  }

  render() {
    const { message } = this.state;

    return (
      <div className="App">
        <header className="App-header">
          <h1>{message}</h1>
          <p>
            Редактируй <code>src/App.js</code> и сохрани для перезагрузки.
          </p>
          <Button>Тестовый компонент</Button>
        </header>
      </div>
    );
  }
}

export default App;
