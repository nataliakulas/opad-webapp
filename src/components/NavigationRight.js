import React from 'react';
import {connect} from 'react-redux';
import {compose} from 'recompose';
import {withRouter} from 'react-router-dom';
import * as routes from '../shared/routes';
import {auth} from '../firebase/config';


const mapStateToProps = (state) => ({
  authUser: state.sessionState.authUser
});

class NavigationRightAuth extends React.Component {
  goTo(route) {
    const {history} = this.props;

    console.log('go to: ' + route);

    switch (route) {
      case 'profile' :
        history.push(routes.PROFILE);
        break;
      default:
        history.push(routes.LANDING);
    }
  }

  render() {
    return (
      <ul className="navigation right">
        <li className="ico power" onClick={() => auth.signOut()}><span className="nav-label">Log out</span></li>
        <li className={`ico user`} onClick={() => this.goTo('profile')}><span className="nav-label">Profile</span></li>
        <li className={`ico settings disabled`} onClick={() => this.goTo('settings')}><span className="nav-label">Settings</span></li>
      </ul>
    )
  }
}

const NavigationRight = ({authUser, history}) =>
  <div>{authUser ? <NavigationRightAuth history={history}/> : null}</div>

export default compose(
  connect(mapStateToProps),
  withRouter
)(NavigationRight);