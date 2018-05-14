import React from 'react';
import {Container, Row, Col} from 'react-grid-system';
import {connect} from 'react-redux';

const mapStateToProps = (state) => ({
  authUser: state.sessionState.authUser
});

class LandingPage extends React.Component {

  render() {
    return (
      <Container>
        <Row>
          <Col>
            <div className="wrapper">
              No sharing, 100% private, just take One Picture a Day
            </div>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default connect(mapStateToProps)(LandingPage)