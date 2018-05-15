import React from 'react';
import {Container, Row, Col} from 'react-grid-system';
import {connect} from 'react-redux';
import {compose} from 'recompose';
import {Link, withRouter} from 'react-router-dom';

import * as routes from '../shared/routes';

import Login from '../components/Login';

const mapStateToProps = (state) => ({
  authUser: state.sessionState.authUser
});


class LandingPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {flip: false}
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

  render() {
    return (
      <Container>
        <Row>
          <Col>
            <div className="landing column-center">
              <div className={this.props.authUser ? "auth" : (this.state.flip ? "non-auth flipped" : "non-auth")}>
                <div className="front" onClick={this.flip}>
                  <p>No sharing, it's all private,<br/> just take, <br/> One Picture a Day.</p>
                </div>
                <div className="back">
                  <Login history={this.props.history}/>
                  <ul>
                    <li><Link to={routes.PASSWORD_RESET}>Forgot password?</Link></li>
                    <li><Link to={routes.REGISTER}>Create account</Link></li>
                    <li onClick={this.flipBack}>Back</li>
                  </ul>
                </div>
              </div>
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