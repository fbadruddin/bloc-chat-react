import React, { Component } from 'react';

class RoomList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      rooms: []
    }
    this.roomsRef = this.props.firebase.database().ref('rooms')
  }
  
  componentDidMount() {
    this.roomsRef.on('child_added', snapshot => {
        const room = {key: snapshot.key, value: snapshot.val()};
        this.setState({ rooms: this.state.rooms.concat(room)});
      });
  }

  render() {
      return (
        <div className="rooms">
            <ul className="rooms-center">
                {this.state.rooms.map(room => 
                    <li key={room.key}>{room.value}</li>    
                )}
            </ul>    
        </div> 
      )
  }
}

export default RoomList;
