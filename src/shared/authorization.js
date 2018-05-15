import React from 'react';
import {connect} from 'react-redux';
import {compose} from 'recompose';
import {withRouter} from 'react-router-dom';

import {auth} from '../firebase/config';
import * as routes from '../shared/routes';

const mapStateToProps = (state) => ({
  authUser: state.sessionState.authUser
});

const authorization = (authCondition) => (Component) => {
  class Authorization extends React.Component {

    componentDidMount() {
      auth.onAuthStateChanged(authUser => {
        if (!authCondition(authUser)) {
          this.props.history.push(routes.LANDING)
        }
      })
    }

    render() {
      return this.props.authUser ? <Component/> : null;
    }
  }

  return compose(
    connect(mapStateToProps),
    withRouter,
  )(Authorization);
};

export default authorization;