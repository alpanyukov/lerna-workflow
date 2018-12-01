import React from 'react';
import UserList from './UserList';
import Messages from './Messages';
import client from './client';

const populateMessage = message => ({
  ...message,
  text: message.text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
});

class Chat extends React.PureComponent {
  state = {
    message: '',
    users: [],
    messages: []
  };

  componentDidMount() {
    client
      .service('messages')
      .find({
        query: {
          $sort: { createdAt: -1 },
          $limit: 25
        }
      })
      .then(messages => {
        this.setState({
          messages: messages.data.reverse().map(populateMessage)
        });
      });

    client
      .service('users')
      .find()
      .then(users => {
        this.setState({
          users: users.data
        });
      });

    client.service('messages').on('created', this.addMessage);
    client.service('users').on('created', this.addUser);
  }

  componentWillUnmount() {
    client.service('messages').removeListener('created', this.addMessage);
    client.service('users').removeListener('created', this.addUser);
  }

  onSubmit = e => {
    e.preventDefault();
    const { message } = this.state;

    client
      .service('messages')
      .create({
        text: message
      })
      .then(() => {
        this.setState({ message: '' });
      });
  };

  setMessage = e => this.setState({ message: e.target.value });

  addUser = user =>
    this.setState(({ users }) => ({ users: users.concat(user) }));

  addMessage = message => {
    console.log(message);
    this.setState(({ messages }) => ({
      messages: messages.concat(populateMessage(message))
    }));
  };

  render() {
    return (
      <main className="flex flex-column">
        <header className="title-bar flex flex-row flex-center">
          <div className="title-wrapper block center-element">
            <img
              className="logo"
              src="http://feathersjs.com/img/feathers-logo-wide.png"
              alt="Feathers Logo"
            />
            <span className="title">Чат</span>
          </div>
        </header>

        <div className="flex flex-row flex-1 clear">
          <aside className="sidebar col col-3 flex flex-column flex-space-between">
            <header className="flex flex-row flex-center">
              <h4 className="font-300 text-center">
                <span className="font-600 online-count">
                  {this.state.users.length}
                </span>{' '}
                пользователей
              </h4>
            </header>

            <UserList users={this.state.users} />

            <footer className="flex flex-row flex-center">
              <a
                href="#"
                onClick={this.props.onLogout}
                className="button button-primary"
              >
                Выйти
              </a>
            </footer>
          </aside>

          <div className="flex flex-column col col-9">
            <Messages messages={this.state.messages} />

            <form
              className="flex flex-row flex-space-between"
              onSubmit={this.onSubmit}
            >
              <input
                type="text"
                value={this.state.message}
                onChange={this.setMessage}
                className="flex flex-1"
              />
              <button className="button-primary" type="submit">
                Отправить
              </button>
            </form>
          </div>
        </div>
      </main>
    );
  }
}

export default Chat;
