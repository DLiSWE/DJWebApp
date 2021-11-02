import React, { Component } from "react";

export default class Room extends Component {
    constructor(props) {
        super(props);
        this.state= {
            VotesRequired: 2,
            CanVote: false
            isHost: false,
        };
        this.roomCode = this.props.match.params.roomCode
    }

        render() {
            return <div>
                <h2>{this.roomCode}</h2>
                <p>Votes: {this.state.VotesRequired</p>
                <p>Guest Can Pause?: {this.state.CanVote}</p>
                <p>Host: {this.state.isHost}</p>
            </div>
        }
}