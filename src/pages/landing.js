import React from 'react';
import {Container, Row, Col} from 'react-grid-system';
import {connect} from 'react-redux';
import {compose} from 'recompose';
import {withRouter} from 'react-router-dom';

import * as routes from '../shared/routes';

import FlipBox from '../components/FlipBox';
import {logIn, registerUser, resetPassword} from '../firebase/auth';
import {createUser} from '../firebase/db';
import {propByKey} from "../shared/helpers";


const mapStateToProps = (state) => ({
  authUser: state.sessionState.authUser
});

class LogIn extends React.Component {
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

class Register extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      password: '',
      password_repeat: ''
    }
  }

  componentWillReceiveProps(props) {
    if (props.authUser) {
      this.props.history.push(routes.DASHBOARD)
    }
  }

  onRegister = (e) => {
    registerUser(this.state.email, this.state.password)
      .then((authUser) => {
        createUser(authUser.user.uid, this.state.name, this.state.email, [])
          .then(() => {
            this.setState(() => ({name: '', email: '', password: ''}));
            this.props.history.push(routes.DASHBOARD);
          })
          .catch(error => {
            this.setState(propByKey('error', error));
          });
      })
      .catch(error => {
        this.setState(propByKey('error', error));
      });

    e.preventDefault();
  };

  render() {
    return (
      <form className="column-center" onSubmit={this.onRegister}>
        <input value={this.state.name}
               onChange={(e) => this.setState(propByKey('name', e.target.value))}
               type="text"
               name="name"
               placeholder="name"/>
        <input value={this.state.email}
               onChange={(e) => this.setState(propByKey('email', e.target.value))}
               type="email"
               name="email"
               placeholder="e-mail"/>
        <input value={this.state.password}
               onChange={(e) => this.setState(propByKey('password', e.target.value))}
               type="password"
               name="password"
               placeholder="password"/>
        <input value={this.state.password_repeat}
               onChange={(e) => this.setState(propByKey('password_repeat', e.target.value))}
               type="password"
               name="password_repeat"
               placeholder="repeat password"/>
        <button className="button" type="submit">Register</button>
      </form>
    )
  }
}

compose(connect(mapStateToProps), withRouter)(Register);

class LandingPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      flip: false,
      flip_reset: false,
      flip_register: false,
      email: ''
    }
  }

  flip = () => {
    if (!this.props.authUser) {
      this.setState({flip: true})
    }
  };

  flipBack = () => {
    if (this.state.flip) {
      this.setState({flip: false})
    }
  };

  onReset = (e) => {
    resetPassword(this.state.email)
      .then(() => {
        this.setState(() => ({email: '', flip_reset: false}));
      })
      .catch(error => {
        this.setState(propByKey('error', error));
      });

    e.preventDefault();
  };

  render() {
    const {history, authUser} = this.props;

    return (
      <Container>
        <Row>
          <Col>
            <div className="landing column-center">
              <div className={authUser ? "auth flip-wrapper column-center" : (this.state.flip ? "non-auth flip-wrapper column-center flipped" : "non-auth flip-wrapper column-center")}>
                <div className="front column-center" onClick={this.flip}>
                  <p>No sharing, it's all private,<br/> just take, <br/> One Picture a Day.</p>
                </div>
                <div className="back column-center">
                  <LogIn history={history}/>
                  <ul>
                    <li onClick={() => this.setState({flip_reset: true})}>Forgot password?</li>
                    <li onClick={() => this.setState({flip_register: true})}>Create account</li>
                    <li onClick={this.flipBack}>Back</li>
                  </ul>
                </div>
              </div>
              <FlipBox flip={this.state.flip_reset}>
                <form className="column-center" style={{}} onSubmit={this.onReset}>
                  <input value={this.state.email}
                         onChange={(e) => this.setState(propByKey('email', e.target.value))}
                         type="email"
                         name="email"
                         placeholder="e-mail"/>
                  <button className="button" type="submit">Reset</button>
                </form>
                <ul>
                  <li onClick={() => this.setState({flip_reset: false})}>Back</li>
                </ul>
              </FlipBox>
              <FlipBox flip={this.state.flip_register}>
                <Register history={history}/>
                <ul>
                  <li onClick={() => this.setState({flip_register: false})}>Back</li>
                </ul>
              </FlipBox>
            </div>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default compose(
  connect(mapStateToProps),
  withRouter
)(LandingPage)