import React, { Component } from "react";
import { render } from "react-dom";
import HomePage from "./HomePage";
// import CRP from "./CRP";
// import JRP from "./JRP";
// import Room from "./Room";

export default class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
        <div>
            <HomePage />
        </div>)
    };
}

const appDiv = document.getElementById("app");
render(<App />, appDiv);