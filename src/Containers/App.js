import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link, Switch} from "react-router-dom";

import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import Register from '../pages/register';

import * as firebase from 'firebase';


var config = {
    apiKey: "AIzaSyBbTG7prMvZJl0lSw6eC0MF_ImwzokHlCs",
    authDomain: "carsend-3ae33.firebaseapp.com",
    databaseURL: "https://carsend-3ae33.firebaseio.com",
    projectId: "carsend-3ae33",
    storageBucket: "carsend-3ae33.appspot.com",
    messagingSenderId: "455011470920"
  };
  firebase.initializeApp(config);

class App extends  Component {

    render() {
        return(
            <Router basename="/carsend/" >
                <Switch>
                    <Route exact path='/' component={Login} />
                    <Route path='/register' component={Register} />
                    <Route path='/app' component={Dashboard} />
                </Switch>
            </Router>
        )
    }
}

export default App;
