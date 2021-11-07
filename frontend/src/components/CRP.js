import React, { Component } from "react";
import { Link } from "react-router-dom";
import { TextField, Button, Grid, Typography, FormHelperText, FormControl, FormControlLabel, Radio, RadioGroup, Collapse } from "@material-ui/core"
import Alert from "@material-ui/lab/Alert";

//create room page component. Set default values and bind functions to constructor
export default class CRP extends Component {
//set default value for properties
    static defaultProps ={
        VotesRequired: 2,
        CanVote: true,
        update: false,
        roomCode: null,
        updateCallback: () => {},
    };

    constructor(props) {
        super(props);
        this.state = {
        CanVote: this.props.CanVote,
        VotesRequired: this.props.VotesRequired,
        errorMsg: "",
        successMsg: "",
        };

        this.handleRoomButtonPress = this.handleRoomButtonPress.bind(this);
        this.handleCanVote = this.handleCanVote.bind(this);
        this.handleVoteNum = this.handleVoteNum.bind(this);
        this.handleUpdateButtonPressed = this.handleUpdateButtonPressed.bind(this);
    }  

    handleVoteNum(e) {
        this.setState({
            VotesRequired: e.target.value,
        });
    }
//set default to false
    handleCanVote(e) {
        this.setState({
            CanVote: e.target.value === "true" ? true : false,

        });
    }

//handle button press to link to specific room with given 'code' field
    handleRoomButtonPress() {
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              votes_to_skip: this.state.VotesRequired,
              can_pause: this.state.CanVote,
            }),
          };
          fetch("/api/create-room", requestOptions)
            .then((response) => response.json())
            .then((data) => this.props.history.push("/room/" + data.code));
        }

    handleUpdateButtonPressed() {
        const requestOptions = {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                votes_to_skip: this.state.VotesRequired,
                can_pause: this.state.CanVote,
                code: this.props.roomCode,
            }),
        };
        fetch("/api/update-room", requestOptions)
            .then((response) => { if (response.ok) {
                this.setState({
                    successMsg: "Room Updated!",
                });
            } else {
                this.setState({
                    errorMsg: "Error updating room",
                });
            }
            this.props.updateCallback();
        });
    }
    renderCreateButtons() {
        return (
    <Grid container spacing = {1}>
        <Grid item xs={12} align="center">
            <Button color="secondary"
                    variant="contained" 
                    onClick={this.handleRoomButtonPress}>
            Create the Room
            </Button>
        </Grid>
        <Grid item xs={12} align="center">
            <Button color="primary" 
                    variant="contained" 
                    to="/" component={Link}>
            Back
            </Button>
        </Grid>)
    </Grid>
        );    
}

    renderUpdateButton() {
        return (
    <Grid container spacing = {1}>
        <Grid item xs={12} align="center">
            <Button color="secondary"
                    variant="contained" 
                    onClick={this.handleUpdateButtonPressed}>
            Update the Room
            </Button>
        </Grid>
    </Grid>            
        );
    }

//render page appearance and assigning events to buttons
    render() {
        const title = this.props.update ? "Update Room" : "Create Room";

        return (
            <Grid container spacing={1}>
            <Grid item xs={12} align="center">
                <Collapse in={this.state.errorMsg != "" || this.state.successMsg != ""}>
                    {this.state.successMsg != "" ? (
                        <Alert 
                            severity="success"
                            onClose={() => {
                                this.setState({ successMsg: ""});
                            }}>
                            {this.state.successMsg}
                        </Alert>) :(
                        <Alert 
                            severity="error"
                            onClose={() => {
                                this.setState({ errorMsg: "" });
                            }}>
                            {this.state.errorMsg}
                       </Alert>
                    )}        
                </Collapse>
            </Grid>
                <Grid item xs={12} align="center">
               <Typography component="h4" variant='h4'>
                   {title}
               </Typography>
               </Grid>
               <Grid item xs={12} align="center">
               <FormControl component="fieldset">
                   <FormHelperText>
                       <div align="Center">
                           Guest Control of Play back State.
                       </div>
                   </FormHelperText>
                        <RadioGroup row defaultValue={this.props.CanVote.toString()} 
                                    onChange={this.handleCanVote}>
                            <FormControlLabel
                                value="true"
                                control={ <Radio color="primary"/>}
                                label="Play/Pause"
                                labelPlacement="bottom" />
                            <FormControlLabel
                                value="false"
                                control={ <Radio color="secondary"/>}
                                label="No Control"
                                labelPlacement="bottom" />
                        </RadioGroup>
               </FormControl>
            </Grid>
                <Grid item xs={12} align="center">
                    <FormControl>
                        <TextField
                            required={true} 
                            type="number"
                            onChange={this.handleVoteNum}
                            defaultValue={this.state.VotesRequired}
                            inputProps={{min: 1,
                                        style: {textAlign: "center" },
                            }}
                        />
                        <FormHelperText>
                            <div align="center"> Votes require for "skip" </div>
                        </FormHelperText>
                    </FormControl>
                </Grid>
                {this.props.update ? this.renderUpdateButton() : this.renderCreateButtons()}
                </Grid>
        )};
}
