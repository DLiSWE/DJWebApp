import React, { Component } from 'react';
import CRP from './CRP';
import JRP from './JRP';
import Example from './Example'
import { 
    BrowserRouter as 
    Router, 
    Switch, 
    Route, 
    Link, 
    Redirect}
from "react-router-dom";

export default class HomePage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <Router>
            <Switch>
                <Route exact path="/">
                    <p>This is the Home Page</p>
                </Route>
                <Route path="/CRP" component={CRP} />
                <Route path="/JRP" component={JRP} />
                <Route path="/Example3/:exampleCode" component={Example} />
            </Switch>
        </Router>
    }
}