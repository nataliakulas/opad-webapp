import React from 'react';
import {Container, Row, Col} from 'react-grid-system';
import {connect} from 'react-redux';
import {compose} from 'recompose';

import {authCondition} from '../shared/helpers';
import authorization from '../shared/authorization';

const mapStateToProps = (state) => ({
  authUser: state.sessionState.authUser
});

class DashboardPage extends React.Component {
  render() {
    return (
      <Container>
        <Row>
          <Col>

          </Col>
        </Row>
      </Container>
    )
  }
}

export default compose(
  authorization(authCondition),
  connect(mapStateToProps),
)(DashboardPage)