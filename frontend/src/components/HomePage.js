import React, { Component } from 'react';
import ExamplePage1 from './ExamplePage1';
import ExamplePage2 from './ExamplePage2';
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
                <Route path="/ExamplePage1" component={ExamplePage1} />
                <Route path="/ExamplePage2" component={ExamplePage2} />
            </Switch>
        </Router>
    }
}