import React from 'react';
import {connect} from 'react-redux';
import {userAuth} from '../duck/actions';

import {auth} from '../firebase/config';

const mapDispatchToProps = dispatch => ({
  userAuth: authUser => dispatch(userAuth(authUser))
});

const authentication = (Component) => {
  class Authentication extends React.Component {
    componentDidMount() {
      auth.onAuthStateChanged(authUser => {
        authUser ? this.props.userAuth(authUser) : this.props.userAuth(null)
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