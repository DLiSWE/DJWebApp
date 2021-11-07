import React, { Component } from "react";
import { Grid, Button, Typography, responsiveFontSizes } from "@material-ui/core";
import CRP from "./CRP";

//create Room component
export default class Room extends Component {
    constructor(props) {
        super(props);
        this.state = {
            VotesRequired: 2,
            CanVote: false,
            isHost: false,
            showSettings: false,
            spotifyAuthenticated: false,
        };
        this.roomCode = this.props.match.params.roomCode;
        this.leaveButtonPressed = this.leaveButtonPressed.bind(this);
        this.updateShowSettings = this.updateShowSettings.bind(this);
        this.renderSettingButton = this.renderSettingButton.bind(this);
        this.renderSetting = this.renderSetting.bind(this);
        this.getRoomDetails = this.getRoomDetails.bind(this);
        this.authenticateSpotify = this.authenticateSpotify.bind(this);
        this.getRoomDetails();

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
                if (this.state.isHost) {
                    this.authenticateSpotify();
                }
            });
        }
//fetch url from AuthURL function which called to SpotifyCallback() then going to front end
        authenticateSpotify() {
            fetch('/spotify/is-authenticated')
                    .then((response) => response.json())
                    .then((data) => {
                this.setState({ spotifyAuthenticated: data.status });
                if (!data.status) {
                    fetch('/spotify/get-auth-url')
                            .then((response) => response.json())
                            .then((data) => {
                        window.location.replace(data.url);
                    });
                }

            });
        }

//leave room on button click and push room callback function onto home page.
//Also _response is used to show that the variable name is not important
        leaveButtonPressed() {
            const requestOptions = {
                method: "POST",
                headers: { "Content-Type": "application/json"},
            };
            fetch('/api/leave', requestOptions).then((_response) => {
                this.props.leaveRoomCallback();
                this.props.history.push('/');
            });
        }

        updateShowSettings(value) {
            this.setState({
                showSettings: value,
            });
        }

        renderSetting() {
        return (
            <Grid container spacing={1}>
                <Grid item xs={12} align="center">
                    <CRP update={true} 
                        votesRequired={this.state.VotesRequired} 
                        CanVote={this.state.CanVote} 
                        roomCode={this.roomCode} 
                        updateCallback={this.getRoomDetails}
                    />
                </Grid>
                <Grid item xs={12} align="center">
                    <Button variant="contained" color="primary" onClick={() => this.updateShowSettings(false)}>
                        Close Setting
                    </Button>
                </Grid>
            </Grid>
        )}

//update room page to show setting button if the user has host privaleges
        renderSettingButton() {
            return(
                <Grid item xs={12} align="center">
                    <Button variant="contained" color="primary" onClick={() => this.updateShowSettings(true)}>
                        Settings
                    </Button>
                </Grid>
            );
        }

//render results onto page from api/get-room
        render() {
            if (this.state.showSettings) {
                return this.renderSetting();
        }
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
                    {this.state.isHost ? this.renderSettingButton() : null}
                    <Grid item xs={12} align="center">
                        <Button variant="contained" color="secondary" onClick={this.leaveButtonPressed}>
                    Leave Room
                        </Button>
                    </Grid>
                </Grid>
                );
            }}