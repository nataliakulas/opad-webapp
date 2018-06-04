import React from 'react';
import {Container, Row, Col} from 'react-grid-system';
import {connect} from 'react-redux';
import {compose} from 'recompose';

import {authCondition, propByKey} from '../shared/helpers';
import authorization from '../shared/authorization';
import {updatePassword} from '../firebase/auth';

import FlipBox from '../components/FlipBox';
import {withRouter} from "react-router-dom";

const mapStateToProps = (state) => ({
  authUser: state.sessionState.authUser
});

class ProfilePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      password: '',
      password_repeat: ''
    }
  }

  onSubmit = (e) => {
    updatePassword(this.state.password)
      .then(() => {
        this.setState(() => ({password: '', password_repeat: ''}));
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
          <Col className="column-center" style={{height: '100vh'}}>
            <FlipBox flip={true} className="relative">
              <form className="column-center" style={{}} onSubmit={this.onSubmit}>
                <input value={this.state.password}
                       onChange={(e) => this.setState(propByKey('password', e.target.value))}
                       type="password"
                       name="password"
                       placeholder="new password"/>
                <input value={this.state.password_repeat}
                       onChange={(e) => this.setState(propByKey('password_repeat', e.target.value))}
                       type="password"
                       name="password_repeat"
                       placeholder="new password repeat"/>
                <button className="button" type="submit">Update</button>
              </form>
            </FlipBox>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default compose(
  authorization(authCondition),
  connect(mapStateToProps),
  withRouter
)(ProfilePage)