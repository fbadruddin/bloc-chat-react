import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import firebase from 'firebase';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';

// Initialize Firebase
var config = {
  apiKey: "AIzaSyCbvv1Hnan0_fWWjaa8ZM5xG8uKsoi_veA",
  authDomain: "bloc-chat-react-repo.firebaseapp.com",
  databaseURL: "https://bloc-chat-react-repo.firebaseio.com",
  projectId: "bloc-chat-react-repo",
  storageBucket: "bloc-chat-react-repo.appspot.com",
  messagingSenderId: "1015979907288"
};
firebase.initializeApp(config);

class App extends Component {
  constructor(props) {
    super (props);
    this.state = {
      activeRoom: null
    }
  }

  setActiveRoom(room) {
    this.setState({activeRoom: room});
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div id="sidebar" className="col-sm-3">
            <h1>Bloc Chat</h1>
            <RoomList firebase={firebase} activeRoom={this.state.activeRoom} setActiveRoom={this.setActiveRoom.bind(this)} /> 
          </div>
          <div className="col-sm-9" id="messages">
            <MessageList firebase={firebase} activeRoom={this.state.activeRoom} />
          </div>
        </div>
      </div>
    );
  }

}

export default App;
