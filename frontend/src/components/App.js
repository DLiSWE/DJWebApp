import React, { Component } from "react";
import { render } from "react-dom";
import HomePage from "./HomePage";
import ExamplePage1 from "./ExamplePage1";
import ExamplePage2 from "./ExamplePage2";

export default class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (<div>
            <HomePage />
        </div>)
    };
}

const appDiv = document.getElementById("app");
render(<App />, appDiv);