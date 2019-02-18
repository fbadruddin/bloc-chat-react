import React, { Component } from 'react';
import { throws } from 'assert';

class MessageList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      messages: []
    }
    this.messagesRef = this.props.firebase.database().ref('messages')
  }
  
  componentDidMount() {
    this.messagesRef.on('child_added', snapshot => {
        const message = {key: snapshot.key, value: snapshot.val()};
        this.setState({ messages: this.state.messages.concat(message)});
      });
  }

  createMessage(e) {
      e.preventDefault();
      let newMessage = document.getElementById('newMessage');
      if(newMessage.value.length===0) return;

      this.messagesRef.push(newMessage.value);
      newMessage.value='';
  }

  render() {
      let displayedMessages = this.state.messages.filter( (message) => {
          return message.value.roomId == this.props.activeRoom.key;
      })
      return (
        <div className="container-fluid">
            <h1 className="Messagelist-header">{this.props.activeRoom === null ? '' : this.props.activeRoom.value}</h1>
            <div className="row">
                <div className="col Messages-list">
                    <table className="table table-striped messages-layout">
                    <tbody>
                        {
                            displayedMessages.map(message => 
                                
                                    <tr key={message.key}>
                                        <td className="col-sm-6">
                                            <b>{message.value.username}</b>
                                            <p>{message.value.content}</p>
                                        </td>
                                        <td className="col-sm-6">
                                            {message.value.sentAt}
                                        </td>
                                    </tr>                                        
                            )
                        }
                        </tbody>
                    </table> 
                </div>
            </div>
            
        </div>
      )
  }
}

export default MessageList;