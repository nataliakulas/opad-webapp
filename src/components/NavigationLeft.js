import React from 'react';
import {connect} from 'react-redux';
import {compose} from 'recompose';
import {withRouter} from 'react-router-dom';
import * as routes from '../shared/routes';
import {setPath} from '../duck/actions';


const mapStateToProps = (state) => ({
  authUser: state.sessionState.authUser,
  path: state.pathState.path
});

const mapDispatchToProps = dispatch => ({
  setActivePath: (path) => dispatch(setPath(path))
});

class NavigationLeft extends React.Component {
  componentDidMount() {
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

    this.props.setActivePath("/" + path);

    switch (path) {
      case 'dashboard' :
        history.push(routes.DASHBOARD);
        break;
      case 'best-loved' :
        history.push(routes.BEST_LOVED);
        break;
      case 'fluke' :
        history.push(routes.FLUKE);
        break;
      case 'add':
        history.push(routes.ADD);
        break;
      default:
        history.push(routes.LANDING);
    }
  }

  render() {
    return (
      <div>
        {this.props.authUser ?
          <ul className="navigation left">
            <li className={`ico home${this.props.path === '/dashboard' ? " active" : ""}`} onClick={() => this.goTo('dashboard')}><span className="nav-label">Dashboard</span></li>
            <li className={`ico camera${this.props.path === '/add' ? " active" : ""}`} onClick={() => this.goTo('add')}><span className="nav-label">Add</span></li>
            <li className={`ico search disabled`}><span className="nav-label">Search</span></li>
            <li className={`ico best-loved${this.props.path === '/best-loved' ? " active" : ""}`} onClick={() => this.goTo('best-loved')}><span className="nav-label">Best loved</span></li>
            <li className={`ico fluke${this.props.path === '/fluke' ? " active" : ""}`} onClick={() => this.goTo('fluke')}><span className="nav-label">Fluke</span></li>
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
)(NavigationLeft);