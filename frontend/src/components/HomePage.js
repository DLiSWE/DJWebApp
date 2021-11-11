import React, { Component } from 'react';
import CRP from './CRP';
import JRP from './JRP';
import Room from './Room';
import { Grid, Button, ButtonGroup, Typography } from '@material-ui/core';
import { 
    BrowserRouter as Router, 
    Switch, 
    Route, 
    Link, 
    Redirect}
from "react-router-dom";
import Info from './info';

//create HomePage component
export default class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            roomCode: null,
        };
        this.clearRoomCode = this.clearRoomCode.bind(this)
    }
//asynchronous connection (we don't have to wait for it to finish before doing other things in program.)    
    async componentDidMount() {
        fetch("/api/user-ir")
            .then((response) => response.json())
            .then((data) => {
            this.setState({roomCode: data.code,});
            });
        }

    renderHomePage() {
        return(
            <Grid container spacing={3}>
                <Grid item xs={12} align="center">
                    <Typography variant="h3" compact="h3">
                        Partay
                    </Typography>
                </Grid>
                <Grid item xs={12} align="center">
                    <ButtonGroup disableElevation variant="contained" color="primary">
                        <Button color="primary" to="/JRP" component={Link}>
                            Join a room!
                        </Button>
                        <Button color="default" to="/info" component={Link}>
                            Info
                        </Button>    
                        <Button color="secondary" to="/CRP" component={Link}>
                            Create a room!
                        </Button>
                    </ButtonGroup>
                </Grid>
            </Grid>

        );
    }

clearRoomCode() {
    this.setState({
        roomCode: null,
    });
}

//Home page should have exact path as / because path will include all other pages as well
    render() {
        return (
        <Router>
            <Switch>
                <Route exact path="/" 
                    render={() => {
                    return this.state.roomCode ? (
                    <Redirect to={`/room/${this.state.roomCode}`} /> )
                    : (this.renderHomePage());
                }}
                />
                <Route path="/CRP" component={CRP} />
                <Route path="/info" component={Info} />
                <Route path="/JRP" component={JRP} />
                <Route path="/room/:roomCode" render={(props) => {
                    return <Room {...props} leaveRoomCallback={this.clearRoomCode} />;
                }} 
                />
            </Switch>
        </Router>
        );
    }
}