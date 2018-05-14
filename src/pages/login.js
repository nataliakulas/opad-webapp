import React from 'react';
import {Container, Row, Col} from 'react-grid-system';
import {connect} from 'react-redux';
import {compose} from 'recompose';

import * as routes from '../shared/routes';

import {logIn} from '../firebase/auth';
import {propByKey} from '../shared/helpers';

const mapStateToProps = (state) => ({
  authUser: state.sessionState.authUser
});

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
      <Container>
        <Row>
          <Col>
            {this.props && this.props.authUser ?
              <p>already logged in</p> :
              <form className="wrapper" style={{height: '25vh'}} onSubmit={this.onSubmit}>
                <input value={this.state.email}
                       onChange={(e) => this.setState(propByKey('email', e.target.value))}
                       type="text"
                       placeholder="e-mail"/>
                <input value={this.state.password}
                       onChange={(e) => this.setState(propByKey('password', e.target.value))}
                       type="password"
                       placeholder="password"/>
                <button className="button" type="submit">Login</button>
              </form>
            }
          </Col>
        </Row>
      </Container>
    )
  }
}

export default compose(
  connect(mapStateToProps),
)(LogInPage)