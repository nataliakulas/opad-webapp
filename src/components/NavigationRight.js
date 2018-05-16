import React from 'react';
import {connect} from 'react-redux';
import {compose} from 'recompose';
import {withRouter} from 'react-router-dom';
import * as routes from '../shared/routes';
import {auth} from '../firebase/config';
import {setPath} from '../duck/actions';

const mapStateToProps = (state) => ({
  authUser: state.sessionState.authUser,
  path: state.pathState.path
});

const mapDispatchToProps = dispatch => ({
  setActivePath: (path) => dispatch(setPath(path))
});

class NavigationRight extends React.Component {
  componentWillMount() {
    this.props.setActivePath(this.props.history.location.pathname);
  }

  componentWillReceiveProps(props) {
    if (this.props.history.location.pathname !== props.history.location.pathname) {
      this.props.setActivePath(props.history.location.pathname);
    }
  }

  componentWillUnmount() {
    this.props.setActivePath(null)
  }

  goTo(path) {
    const {history} = this.props;

    console.log('go to: ' + path);

    this.props.setActivePath("/" + path);

    switch (path) {
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
            <li className={`ico user${this.props.path === '/profile' ? " active" : ""}`} onClick={() => this.goTo('profile')}><span className="nav-label">Profile</span></li>
            <li className={`ico settings disabled${this.props.path === '/settings' ? " active" : ""}`} onClick={() => this.goTo('settings')}><span className="nav-label">Settings</span></li>
            <li className={`ico info disabled${this.props.info === '/profile' ? " active" : ""}`} onClick={() => this.goTo('info')}><span className="nav-label">Info</span></li>
          </ul> : null
        }
      </div>
    )
  }
}

export default compose(
  connect(mapStateToProps),
  connect(null, mapDispatchToProps),
  withRouter
)(NavigationRight);