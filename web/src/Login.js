import React from 'react';

class Login extends React.PureComponent {
  state = {
    email: '',
    password: ''
  };

  changeLogin = e => this.setState({ email: e.target.value });
  changePass = e => this.setState({ password: e.target.value });

  onLogin = () => {
    this.props.onLogin(this.state);
  };

  onRegister = () => {
    this.props.onRegister(this.state);
  };

  render() {
    return (
      <main className="login container">
        <div className="row">
          <div className="col-12 col-6-tablet push-3-tablet text-center heading">
            <h1 className="font-100">Log in or signup</h1>
            {this.state.error && <p>Произошла ошибка: {this.state.error}</p>}
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-6-tablet push-3-tablet col-4-desktop push-4-desktop">
            <form className="form">
              <fieldset>
                <input
                  className="block"
                  type="email"
                  placeholder="Email"
                  value={this.state.email}
                  onChange={this.changeLogin}
                />
              </fieldset>

              <fieldset>
                <input
                  className="block"
                  type="password"
                  placeholder="Пароль"
                  value={this.state.password}
                  onChange={this.changePass}
                />
              </fieldset>

              <button
                type="button"
                className="button button-primary block signup"
                onClick={this.onLogin}
              >
                Войти
              </button>

              <button
                type="button"
                className="button button-primary block signup"
                onClick={this.onRegister}
              >
                Зарегистрироваться и войти
              </button>
            </form>
          </div>
        </div>
      </main>
    );
  }
}

export default Login;
