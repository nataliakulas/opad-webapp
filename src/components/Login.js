import React from 'react';

import * as routes from '../shared/routes';

import {logIn} from '../firebase/auth';
import {propByKey} from '../shared/helpers';

class LogInPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: ''
    }
  }

  onSubmit = (e) => {
    logIn(this.state.email, this.state.password)
      .then(() => {
        this.setState(() => ({email: '', password: ''}))
        this.props.history.push(routes.DASHBOARD);
      });

    e.preventDefault();
  };

  render() {
    return (
      <form className="column-center" onSubmit={this.onSubmit}>
        <input value={this.state.email}
               onChange={(e) => this.setState(propByKey('email', e.target.value))}
               type="email"
               placeholder="e-mail"/>
        <input value={this.state.password}
               onChange={(e) => this.setState(propByKey('password', e.target.value))}
               type="password"
               placeholder="password"/>
        <button className="button" type="submit">Login</button>
      </form>
    )
  }
}

export default (LogInPage)