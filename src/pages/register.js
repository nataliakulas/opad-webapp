import React from 'react';
import {Container, Row, Col} from 'react-grid-system';

import {createUser} from '../firebase/auth';
import {propByKey} from '../shared/helpers';


class RegisterPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: ''
    }
  }


  onSubmit = (e) => {
    createUser(this.state.email, this.state.password)
      .then(() => {
        this.setState(() => ({email: '', password: ''}))
      });


    e.preventDefault();
  };

  render() {
    return (
      <Container>
        <Row>
          <Col>
            <form onSubmit={this.onSubmit}>
              <input value={this.state.email}
                     onChange={(e) => this.setState(propByKey('email', e.target.value))}
                     type="text"
                     placeholder="e-mail"/>
              <input value={this.state.password}
                     onChange={(e) => this.setState(propByKey('password', e.target.value))}
                     type="password"
                     placeholder="password"/>
              <button type="submit">Register</button>
            </form>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default RegisterPage