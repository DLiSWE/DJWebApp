import React, { Component } from 'react';
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField"
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from "@material-ui/core/FormControl";
import { Link } from "react-router-dom";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";

export default class ExamplePage1 extends Component {
    defaultInt = 2;

    constructor(props) {
        super(props);
    }

    render() {
        return <Grid container spacing={1}>
            <Grid item xs={12} align="center">
               <Typography component="h4" variant='h4'>
                   Create example DB
               </Typography>
               <FormControl component="fieldset">
                   <FormHelperText>
                       <div align="Center">
                           Guest Control of db state.
                       </div>
                   </FormHelperText>
                        <RadioGroup row defaultValue="true">
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
                            defaultValue={this.defaultInt}
                            inputProps={{min: 1,}}
                        />
                        <FormHelperText>
                            <div align="center"> Int require for "skip" </div>
                        </FormHelperText>
                    </FormControl>
                </Grid>
                <Grid item xs={12} align="center">
                    <Button color="secondary" variant="contained">
                        Create the dbModel
                    </Button>
                </Grid>
                <Grid item cs={12} align="center">
                    <Button color="primary" variant="contained" to="/" component={Link}>
                        Back
                    </Button>
                </Grid>
                </Grid>
    };
}
}