import React from 'react';
import {Container, Row, Col} from 'react-grid-system';
import {connect} from 'react-redux';
import {compose} from 'recompose';

import {authCondition} from '../shared/helpers';
import authorization from '../shared/authorization';
import {auth, storage} from '../firebase/config';
import {getRefs} from '../firebase/db';

const mapStateToProps = (state) => ({
  authUser: state.sessionState.authUser
});

class DashboardPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pictures: []
    }
  }

  componentDidMount() {
    const userId = auth.currentUser.uid;
    const pictures = [];

    getRefs(userId)
      .then(snap => {
        snap.forEach(item => {
          let url = item.val()['url'];

          storage.ref(`${url}`).getDownloadURL()
            .then(url => pictures.push(url))
            .then(() => this.setState({pictures: pictures}))
        })
      })
  }

  render() {
    return (
      <Container>
        <Row>
          <Col xs={10} offset={{xs: 1}}>
            <div className="pictures">
              {this.state.pictures.map((picture, i) => {
                i++;
                return (
                  <img key={i} className="picture" src={picture} alt=""/>
                )
              })}
            </div>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default compose(
  authorization(authCondition),
  connect(mapStateToProps),
)(DashboardPage)