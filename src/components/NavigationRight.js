import React from 'react';
import {connect} from 'react-redux';
import {compose} from 'recompose';
import {withRouter} from 'react-router-dom';
import * as routes from '../shared/routes';
import {auth} from '../firebase/config';


const mapStateToProps = (state) => ({
  authUser: state.sessionState.authUser
});

class NavigationRight extends React.Component {
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
      <div>
        {this.props.authUser ?
          <ul className="navigation right">
            <li className="ico power" onClick={() => auth.signOut()}><span className="nav-label">Log out</span></li>
            <li className={`ico user`} onClick={() => this.goTo('profile')}><span className="nav-label">Profile</span></li>
            <li className={`ico settings disabled`} onClick={() => this.goTo('settings')}><span className="nav-label">Settings</span></li>
            <li className={`ico info disabled`} onClick={() => this.goTo('info')}><span className="nav-label">Info</span></li>
          </ul> : null
        }
      </div>
    )
  }
}

export default compose(
  connect(mapStateToProps),
  withRouter
)(NavigationRight);