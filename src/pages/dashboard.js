import React from 'react';
import {Container, Row, Col} from 'react-grid-system';
import {connect} from 'react-redux';
import {compose} from 'recompose';
import moment from 'moment';

import {authCondition} from '../shared/helpers';
import authorization from '../shared/authorization';

import {getItems, removeItem} from '../duck/actions';
import {auth} from '../firebase/config';
import {removeDbRefs} from '../firebase/db';

import Box from '../components/Box';


const mapStateToProps = (state) => ({
  authUser: state.sessionState.authUser,
  items: state.itemsState.items
});

const mapDispatchToProps = dispatch => ({
  getItems: () => dispatch(getItems()),
  removeItem: name => dispatch(removeItem(name))
});

class DashboardPage extends React.Component {
  componentDidMount() {
    this.props.getItems();
  }

  removeItem(name) {
    const userId = auth.currentUser.uid;

    removeDbRefs(name, userId, this.props.removeItem(name));
  };

  downloadItem(url) {
    if (url) {
      let xhr = new XMLHttpRequest();
      xhr.responseType = 'blob';
      xhr.onload = (event) => {
        let blob = xhr.response;
      };
      xhr.open('GET', url);
      xhr.send();
    }
  }

  render() {
    let items = [];
    if (this.props.items.length > 0) {
      items = this.props.items;

      items.sort((prev, next) => {
        return moment(next.name) - moment(prev.name)
      });
    }

    return (
      <Container style={{minHeight: '100vh'}}>
        <Row>
          <Col>
            {items.length === 0 ?
              <div className="fullpage column-center">
                <p>One Picture a Day</p></div> :
              <div className="box-grid">
                {items.map((item, i) => {
                  i++;
                  return (
                    <Box key={i} src={item.url} name={item.name} tag={item.tag} fav={item.fav}
                         remove={() => this.removeItem(item.name)}
                         download={() => this.downloadItem(item.url)}
                         className="small"
                         margin={10}
                    />
                  )
                })}
              </div>
            }
          </Col>
        </Row> </Container>
    )
  }
}

export default compose(
  authorization(authCondition),
  connect(mapStateToProps),
  connect(null, mapDispatchToProps)
)(DashboardPage)