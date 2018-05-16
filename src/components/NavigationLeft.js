import React from 'react';
import {connect} from 'react-redux';
import {compose} from 'recompose';
import {withRouter} from 'react-router-dom';
import * as routes from '../shared/routes';


const mapStateToProps = (state) => ({
  authUser: state.sessionState.authUser
});

class NavigationLeft extends React.Component {
  goTo(route) {
    const {history} = this.props;

    console.log('go to: ' + route);

    switch (route) {
      case 'dashboard' :
        history.push(routes.DASHBOARD);
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
            <li className={`ico home`} onClick={() => this.goTo('dashboard')}><span className="nav-label">Dashboard</span></li>
            <li className={`ico camera`} onClick={() => this.goTo('add')}><span className="nav-label">Add</span></li>
            <li className={`ico search disabled`}><span className="nav-label">Search</span></li>
          </ul> : null
        }
      </div>
    )
  }
}

export default compose(
  connect(mapStateToProps),
  withRouter
)(NavigationLeft);