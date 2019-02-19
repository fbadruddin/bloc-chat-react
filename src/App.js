import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import firebase from 'firebase';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';
import User from './components/User';

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
      activeRoom: null,
      signedInUser: null
    }
  }

  setActiveRoom(room) {
    this.setState({activeRoom: room});
  }

  setUser(user) {
    this.setState({signedInUser:user});
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div id="sidebar" className="col-sm-3">
            <User firebase={firebase} setUser={this.setUser.bind(this)} user={this.state.signedInUser} />
            <h1>Bloc Chat</h1>
            <RoomList firebase={firebase} activeRoom={this.state.activeRoom} setActiveRoom={this.setActiveRoom.bind(this)} user={this.state.signedInUser} /> 
          </div>
          <div className="col-sm-9" id="messages">
            <MessageList firebase={firebase} activeRoom={this.state.activeRoom} user={this.state.signedInUser} />
          </div>
        </div>
      </div>
    );
  }

}

export default App;
