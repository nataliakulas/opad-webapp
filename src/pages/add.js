import React from 'react';
import {Container, Row, Col} from 'react-grid-system';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import {storage} from '../firebase/config';

class AddPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      picture: '',
      date: moment(),
      error: ''
    }
  }

  setDate = (date) => {
    this.setState({date: date})
  };

  setPicture = (e) => {
    this.setState({picture: e.target.files[0]})
  };

  onSubmit = (e) => {
    const name = moment(this.state.date).format('YYYY-MM-D');
    const picture = this.state.picture;

    this.setState({loading: true});

    storage.child(name)
      .put(picture)
      .then(() => this.setState({loading: false}))
      .catch(error => this.setState({error: error.message}));

    e.preventDefault();
  };

  render() {

    console.log(moment(this.state.date).format('YYYY-MM-D'));

    return (
      <Container>
        <Row>
          <Col>
            <form onSubmit={this.onSubmit}>
              <DatePicker selected={this.state.date} onChange={this.setDate}/>
              <input type="file" onChange={this.setPicture}/>
              <button type="submit">Add photo</button>
            </form>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default AddPage