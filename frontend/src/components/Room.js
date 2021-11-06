import React, { Component } from "react";
import { Grid, Button, Typography } from "@material-ui/core";

//create Room component
export default class Room extends Component {
    constructor(props) {
        super(props);
        this.state = {
            VotesRequired: 2,
            CanVote: false,
            isHost: false,
        };
        this.roomCode = this.props.match.params.roomCode;
        this.getRoomDetails();
        this.leaveButtonPressed = this.leaveButtonPressed.bind(this)
    }   
//fetch data from page
        getRoomDetails() {
            return fetch('/api/get-room' + '?code=' + this.roomCode)
            .then((response) => {if (!response.ok) {
                this.props.leaveRoomCallback();
                this.props.history.push("/");
            }
            return response.json();
        })
            .then((data) => {
                this.setState({
                    VotesRequired: data.votes_to_skip,
                    CanVote: data.can_pause,
                    isHost: data.is_host,
                });
            });
        }

        leaveButtonPressed() {
            const requestOptions = {
                method: "POST",
                headers: { "Content-Type": "application/json"},
            };
            fetch('/api/leave', requestOptions).then((response) => {
                this.props.leaveRoomCallback();
                this.props.history.push('/');
            });
        }

//render results onto page from api/get-room
        render() {
            return (
                <Grid container spacing={1}>
                    <Grid item xs={12} align="center">
                        <Typography variant="h4" component="h4">
                            Code: {this.roomCode}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} align="center">
                        <Typography variant="h6" component="h6">
                            Votes Required : {this.state.VotesRequired}    
                        </Typography>                    
                    </Grid>
                    <Grid item xs={12} align="center">
                        <Typography variant="h6" component="h6">
                            Guest Can Pause : {this.state.CanVote.toString()}                        
                        </Typography>
                    </Grid>
                    <Grid item xs={12} align="center">
                        <Typography variant="h6" component="h6">
                            Host : {this.state.isHost.toString()}                        
                        </Typography>
                    </Grid>
                    <Grid item xs={12} align="center">
                    <Button variant="contained" color="secondary" onClick={this.leaveButtonPressed}>
                    Leave Room
                    </Button>
                    </Grid>
                    </Grid>
                    );
                    }}