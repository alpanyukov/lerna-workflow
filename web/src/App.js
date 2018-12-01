import React, { Component } from 'react';
import Chat from './Chat';
import Login from './Login';
import client from './client';

class App extends Component {
  state = {
    auth: false
  };

  componentDidMount() {
    this.login();
  }

  login = credentials => {
    const pr = !credentials
      ? client.authenticate()
      : client.authenticate({ strategy: 'local', ...credentials });

    pr.then(() => {
      this.setState({ auth: true });
    }).catch(e => {
      console.log(e.message);
      this.setState({ auth: false });
    });
  };

  register = credentials => {
    client
      .service('users')
      .create(credentials)
      .then(() => {
        this.login(credentials);
      });
  };

  logout = () => {
    client.logout().then(() => {
      this.setState({ auth: false });
    });
  };

  render() {
    return this.state.auth ? (
      <Chat onLogout={this.logout} />
    ) : (
      <Login onLogin={this.login} onRegister={this.register} />
    );
  }
}

export default App;
