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
      let message = document.getElementById('newMessage');
      if(message.value.length===0) return;
      this.messagesRef.push().set({
        content: message.value,
        sentAt: new Date().toLocaleTimeString(),
        roomId: this.props.activeRoom.key,
        username: this.props.user ? this.props.user.displayName : 'Guest'
    });  
    message.value='';
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
                <div className="col" id="divbottom">
                    <div className="row">
                        <div className="col-sm-10">
                            <input className="form-control" type="text" id="newMessage" autoComplete="off" />
                        </div>
                        <div className="col-sm-2 nopadding">
                            <input type="button" id="send" className="btn btn-primary" value="Send" onClick={(e) => this.createMessage(e)} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
      )
  }
}

export default MessageList;