/**
 * Created by gongzhaopeng on 2019/9/19.
 */
import React, {Component}  from 'react';

import {history} from '../history/history';
import {loginWithGithub} from '../backend/auth';
import Welcome from '../components/welcome/Welcome';

export class Login extends Component {
    constructor(props) {
        super(props);
        this.login = this.login.bind(this);
    }

    login() {
        loginWithGithub().then(() => {
            history.push('/');
        });
    }

    render() {
        return (
            <div className="login">
                <div className="welcome­container">
                    <Welcome/>
                </div>
                <div className="providers">
                    <button onClick={this.login}>
                        <i className={`fa fa-github`}>
                            log in with Github
                        </i>
                    </button>
                </div>
            </div>
        );
    }
}

export default Login;
