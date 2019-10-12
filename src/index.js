import React from "react";
import {render} from "react-dom";
import {Provider} from 'react-redux';

import App from "./app";
import Home from "./pages/Home";
import Router from "./components/router/Router";
import Route from "./components/router/Route";
import {history} from "./history/history";

import "./shared/crash";
import "./shared/service-worker";
import "./shared/vendor";
// NOTE: this isn't ES*-compliant/possible, but works because we use Webpack as a build tool
import "./styles/styles.scss";
import SinglePost from "./pages/SinglePost";
import NotFound from "./pages/404";
import Login from "./pages/Login";
import {firebase} from "./backend/core";
import {getFirebaseToken} from "./backend/auth";
import * as API from "./shared/http";

import configureStore from './store/configureStore';
import initialReduxState from './constants/initialState';

import {createError} from './actions/error';
import {loginSuccess} from './actions/auth';
import {loaded, loading} from './actions/loading';

// import "./store/exampleUse";    // TODO to remove this.

const store = configureStore(initialReduxState);

export const renderApp = (state, callback = () => {
}) => {
    render(
        <Provider store={store}>
            <Router {...state}>
                <Route path="" component={App}>
                    <Route path='/' component={Home}/>
                    <Route path="/posts/:postId" component={SinglePost}/>
                    <Route path='/login' component={Login}/>
                    <Route path="*" component={NotFound}/>
                </Route>
            </Router>
        </Provider>,
        document.getElementById("app"),
        callback
    );
};

const initialState = {
    location: window.location.pathname
};

renderApp(initialState);

history.listen(location => {
    const user = firebase.auth().currentUser;
    const newState = Object.assign({}, initialState, {
        location: user ? location.pathname : "/login"
    });
    renderApp(newState);
});

firebase.auth().onAuthStateChanged(async user => {
    console.log("Auth state changed...");
    console.log("Github user: ", user);
    if (!user) {
        return history.push("/login");
    }

    // TODO

    const token = await getFirebaseToken();
    const res = await API.loadUser(user.uid);
    let renderUser;
    if (res.status === 404) {
        const userPayload = {
            name: user.displayName,
            profilePicture: user.photoURL,
            id: user.uid
        };
        renderUser = await API.createUser(userPayload)
            .then(res => res.json());
    } else {
        renderUser = await res.json();
    }
    history.push("/");
    state = Object.assign({}, state, {
        user: {
            name: renderUser.name,
            id: renderUser.id,
            profilePicture: renderUser.profilePicture,
            authenticated: true
        },
        token
    });
    renderApp(state);
});
