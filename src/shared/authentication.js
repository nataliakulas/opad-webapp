import React from 'react';
import {connect} from 'react-redux';
import {AUTH_USER} from '../duck/reducers';

import {auth} from '../firebase/config';

const mapDispatchToProps = dispatch => ({
  onsetAuthUser: authUser => dispatch({authUser, type: AUTH_USER})
});

const authentication = (Component) => {
  class Authentication extends React.Component {
    componentDidMount() {
      auth.onAuthStateChanged(authUser => {
        authUser ? this.props.onsetAuthUser(authUser) : this.props.onsetAuthUser(null)
      })
    }

    render() {
      return (
        <Component/>
      );
    }
  }

  return connect(null, mapDispatchToProps)(Authentication);
};

export default authentication;