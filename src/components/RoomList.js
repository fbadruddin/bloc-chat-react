import React, { Component } from 'react';

class RoomList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      rooms: [],
    }
    this.roomsRef = this.props.firebase.database().ref('rooms')
  }
  
  componentDidMount() {
    this.roomsRef.on('child_added', snapshot => {
        const room = {key: snapshot.key, value: snapshot.val()};
        this.setState({ rooms: this.state.rooms.concat(room)});
        if(this.state.rooms.length === 1) //set the first room as the active room
        {
            this.props.setActiveRoom(room);
        }
      });
  }

  createRoom(e) {
      e.preventDefault();
      let newRoom = document.getElementById('newRoom');
      if(newRoom.value.length===0) return;

      this.roomsRef.push(newRoom.value);
      newRoom.value='';
  }

  onChangeHandled(e) {
      if(e.target.value != '')
      {
        document.getElementById('create').disabled = false;
      }
      else
      {
        document.getElementById('create').disabled = true;
      }
  }
 
  render() {
      return (
        <div className="rooms">
            <ul className="rooms-center">
            {
                this.state.rooms.map(room => 
                    <li key={room.key}><a href="#" onClick={ () => this.props.setActiveRoom(room)}>{room.value}</a></li>
                )
            }
            </ul>
            <form>
                <input className="form-control" type="text" id="newRoom" onChange ={(e) => this.onChangeHandled(e)} autoComplete="off"/>
                <p></p>
                <input type="button" id="create" className="btn btn-primary" value="Create" onClick={(e) => this.createRoom(e)} disabled="disabled"/>
            </form>
        </div> 
      )
  }
}

export default RoomList;
