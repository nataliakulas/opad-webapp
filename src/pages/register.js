import React from 'react';
import {Container, Row, Col} from 'react-grid-system';
import {connect} from 'react-redux';
import {compose} from 'recompose';
import {withRouter} from 'react-router-dom';

import * as routes from '../shared/routes';

import {registerUser} from '../firebase/auth';
import {createUser} from '../firebase/db';
import {propByKey} from '../shared/helpers';

const mapStateToProps = (state) => ({
  authUser: state.sessionState.authUser
});

class RegisterPage extends React.Component {
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
    props.authUser ? this.props.history.push(routes.DASHBOARD) : null
  }

  onSubmit = (e) => {
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
      <Container>
        <Row>
          <Col>
            <form className="column-center" style={{height: '50vh', marginTop: '25vh'}} onSubmit={this.onSubmit}>
              <input value={this.state.name}
                     onChange={(e) => this.setState(propByKey('name', e.target.value))}
                     type="text"
                     placeholder="name"/>
              <input value={this.state.email}
                     onChange={(e) => this.setState(propByKey('email', e.target.value))}
                     type="email"
                     placeholder="e-mail"/>
              <input value={this.state.password}
                     onChange={(e) => this.setState(propByKey('password', e.target.value))}
                     type="password"
                     placeholder="password"/>
              <input value={this.state.password_repeat}
                     onChange={(e) => this.setState(propByKey('password_repeat', e.target.value))}
                     type="password"
                     placeholder="repeat password"/>
              <button className="button" type="submit">Register</button>
            </form>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default compose(
  connect(mapStateToProps),
  withRouter
)(RegisterPage)