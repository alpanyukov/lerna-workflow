import React from 'react';

class UserList extends React.PureComponent {
  static defaultProps = {
    users: []
  };

  render() {
    const { users } = this.props;
    return (
      <ul className="flex flex-column flex-1 list-unstyled user-list">
        {users.map((u, index) => (
          <li key={index}>
            <a className="block relative" href="#">
              <img src={u.avatar} alt="user avatar" className="avatar" />
              <span className="absolute username">{u.email}</span>
            </a>
          </li>
        ))}
      </ul>
    );
  }
}

export default UserList;
