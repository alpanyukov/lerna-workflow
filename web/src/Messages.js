import React from 'react';

class Messages extends React.PureComponent {
  static defaultProps = {
    messages: []
  };

  render() {
    return (
      <main className="chat flex flex-column flex-1 clear">
        {this.props.messages.map((m, index) => (
          <div key={index} className="message flex flex-row">
            {m.user && (
              <img src={m.user.avatar} alt={m.user.email} className="avatar" />
            )}
            <div className="message-wrapper">
              <p className="message-header">
                {m.user && (
                  <span className="username font-600">{m.user.email}</span>
                )}
                <span className="sent-date font-300">{m.createdAt}</span>
              </p>
              <p className="message-content font-300">{m.text}</p>
            </div>
          </div>
        ))}
      </main>
    );
  }
}

export default Messages;
