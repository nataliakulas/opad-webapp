import React from 'react';
import {Container, Row, Col} from 'react-grid-system';
import {connect} from 'react-redux';
import {compose} from 'recompose';
import {withRouter} from 'react-router-dom';

import * as routes from '../shared/routes';

import {resetPassword} from '../firebase/auth';
import {propByKey} from '../shared/helpers';

const mapStateToProps = (state) => ({
  authUser: state.sessionState.authUser
});

class ResetPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: ''
    }
  }

  componentWillReceiveProps(props) {
    props.authUser ? this.props.history.push(routes.DASHBOARD) : null
  }

  onSubmit = (e) => {
    resetPassword(this.state.email)
      .then(() => {
        this.setState(() => ({email: ''}));
      })
      .catch(error => {
        this.setState(propByKey('error', error));
      });

    e.preventDefault();
  };

  render() {
    return <Container>
      <Row>
        <Col>
          <form className="column-center" style={{height: '50vh', marginTop: '25vh'}} onSubmit={this.onSubmit}>
            <input value={this.state.email}
                   onChange={(e) => this.setState(propByKey('email', e.target.value))}
                   type="email"
                   name="email"
                   placeholder="e-mail"/>
            <button className="button" type="submit">Reset</button>
          </form>
        </Col>
      </Row>
    </Container>
  }
}

export default compose(
  connect(mapStateToProps),
  withRouter
)(ResetPage)