import React, { Component } from "react";
import { Link } from "react-router-dom";
import { TextField, Button, Grid, Typography, FormHelperText, FormControl, FormControlLabel, Radio, RadioGroup } from "@material-ui/core"

//create room page component. Set default values and bind functions to constructor
export default class CRP extends Component {
    defaultInt = 2;

    constructor(props) {
        super(props);
        this.state = {
        CanVote: true,
        VotesRequired: this.defaultInt,
        };

        this.handlebuttonpress = this.handlebuttonpress.bind(this);
        this.handleCanVote = this.handleCanVote.bind(this);
        this.handleVoteNum = this.handleVoteNum.bind(this);
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
    handlebuttonpress() {
        const requestOptions = {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                votes_to_skip: this.state.VotesRequired,
                can_pause: this.state.CanVote,
            }),
        };
        fetch("/api/create-room", requestOptions)
            .then((response) => response.json())
            .then((data) => this.props.history.push('/room/' + data.code));
    }

//render page appearance and assigning events to buttons
    render() {
        return <Grid container spacing={1}>
            <Grid item xs={12} align="center">
               <Typography component="h4" variant='h4'>
                   Create Room
               </Typography>
               <FormControl component="fieldset">
                   <FormHelperText>
                       <div align="Center">
                           Guest Control of Play back State.
                       </div>
                   </FormHelperText>
                        <RadioGroup row defaultValue="true" onChange={this.handleCanVote}>
                            <FormControlLabel
                                value="true"
                                control={ <Radio color="primary"/>}
                                label="T/F"
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
                            defaultValue={this.defaultInt}
                            inputProps={{min: 1,}}
                        />
                        <FormHelperText>
                            <div align="center"> Int require for "skip" </div>
                        </FormHelperText>
                    </FormControl>
                </Grid>
                <Grid item xs={12} align="center">
                    <Button color="secondary" variant="contained" onClick={this.handlebuttonpress}>
                        Create the Room
                    </Button>
                </Grid>
                <Grid item xs={12} align="center">
                    <Button color="primary" variant="contained" to="/" component={Link}>
                        Back
                    </Button>
                </Grid>
                </Grid>
    };
}
