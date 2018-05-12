import React from 'react';
import {auth} from '../firebase/config';

export class NavigationLeft extends React.Component {
  render() {
    return (
      <ul className="navigation left">
        <li className="ico home active"><span className="nav-label">Dashboard</span></li>
        <li className="ico camera"><span className="nav-label">Add</span></li>
        <li className="ico search"><span className="nav-label">Search</span></li>
      </ul>
    )
  }
}

export class NavigationRight extends React.Component {
  render() {
    return (
      <ul className="navigation right">
        <li className="ico power" onClick={() => auth.signOut()}><span className="nav-label">Log out</span></li>
        <li className="ico user"><span className="nav-label">Profile</span></li>
      </ul>
    )
  }
}