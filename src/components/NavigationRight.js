import React from 'react';
import {connect} from 'react-redux';
import {compose} from 'recompose';
import {withRouter} from 'react-router-dom';
import * as routes from '../shared/routes';
import {auth} from '../firebase/config';

class NavigationRightAuth extends React.Component {
  goTo(route) {
    const {history} = this.props;

    console.log('go to: ' + route);

    switch (route) {
      case 'profile' :
        history.push(routes.DASHBOARD);
        break;
      default:
        history.push(routes.LANDING);
    }
  }

  render() {
    return (
      <ul className="navigation right">
        <li className="ico power" onClick={() => auth.signOut()}><span className="nav-label">Log out</span></li>
        <li className="ico user" onClick={() => this.goTo('profile')}><span className="nav-label">Profile</span></li>
      </ul>
    )
  }
}

class NavigationRightUnAuth extends React.Component {
  render() {
    return (
      <ul className="navigation right">
      </ul>
    )
  }
}

const NavigationRight = ({authUser, history}) =>
  <div>{authUser ? <NavigationRightAuth history={history}/> : <NavigationRightUnAuth history={history}/>}</div>

const mapStateToProps = (state) => ({
  authUser: state.sessionState.authUser
});

export default compose(
  connect(mapStateToProps),
  withRouter
)(NavigationRight);