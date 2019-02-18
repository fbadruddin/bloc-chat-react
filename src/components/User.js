import React, { Component } from 'react';

class User extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.firebase.auth().onAuthStateChanged ( user => {
            this.props.setUser(user);
        })
    }

    signInWithPopup() {
        const provider = new this.props.firebase.auth.GoogleAuthProvider();
        this.props.firebase.auth().signInWithPopup(provider)
        .then((data) => {
            this.props.setUser(data.user);
        });
    }

    signOut() {
        this.props.firebase.auth().signOut()
        .then( () => {
            this.props.setUser(null);
        });
    }

    render() {
        return (
            <div className="User">
                <div className="row">
                    <div className="col-sm-4">
                        <input type="Button" 
                            className="btn btn-info" 
                            id="signIn" 
                            onClick = {this.props.user ? this.signOut.bind(this) : this.signInWithPopup.bind(this)} 
                            value={this.props.user ? 'Sign Out' : 'Sign In'}
                        />
                    </div>
                    <div className="col">
                        <label><b>Welcome {this.props.user ? this.props.user.displayName : ' Guest'}</b></label>
                    </div>
                </div>
            </div>
        )
    }
}

export default User;