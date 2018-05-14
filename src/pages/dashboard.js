import React from 'react';
import {Container, Row, Col} from 'react-grid-system';
import {connect} from 'react-redux';
import {compose} from 'recompose';
import moment from 'moment';

import {authCondition} from '../shared/helpers';
import authorization from '../shared/authorization';
import {storage} from '../firebase/config';

import {getItems} from '../duck/actions';

import Box from '../components/Box';

const mapStateToProps = (state) => ({
  authUser: state.sessionState.authUser,
  items: state.itemsState.items
});

const mapDispatchToProps = dispatch => ({
  getItems: () => dispatch(getItems())
});

class DashboardPage extends React.Component {

  componentDidMount() {
    this.props.getItems();
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
      <Container>
        <Row>
          <Col xs={10} offset={{xs: 1}}>
            <div className="box-grid">
              {items.map((item, i) => {
                i++;
                return (
                  <Box key={i} src={item.url} name={item.name}/>
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
  connect(null, mapDispatchToProps)
)(DashboardPage)