import React from 'react';
import {Container, Row, Col} from 'react-grid-system';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import {auth, storage} from '../firebase/config';

class AddPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      picture: '',
      pictureUrl: '',
      date: moment(),
      error: ''
    }
  }

  setDate = (date) => {
    this.setState({date: date})
  };

  setPicture = (e) => {
    let reader = new FileReader();
    let picture = e.target.files[0];


    reader.onloadend = () => {
      this.setState({picture: picture, pictureUrl: reader.result})
    };

    reader.readAsDataURL(picture)
  };

  onSubmit = (e) => {
    const userId = auth.currentUser.uid;
    const name = moment(this.state.date).format('YYYY-MM-D');
    const picture = this.state.picture;

    this.setState({loading: true});

    storage.child(userId + '/' + name)
      .put(picture)
      .then(() => this.setState({loading: false}))
      .catch(error => this.setState({error: error.message}));

    e.preventDefault();
  };

  render() {
    return (
      <Container>
        <Row>
          <Col>
            <form onSubmit={this.onSubmit}>
              <DatePicker selected={this.state.date} onChange={this.setDate}/>
              <input type="file" onChange={this.setPicture}/>
              <button type="submit">Add photo</button>
            </form>
            {this.state.pictureUrl ?
              <img src={this.state.pictureUrl} alt=""/>
              : null}
          </Col>
        </Row>
      </Container>
    )
  }
}

export default AddPage