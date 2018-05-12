import React from 'react';
import {Container, Row, Col} from 'react-grid-system';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';
import '../styles/datepicker.css'

import {auth, storage} from '../firebase/config';
import {createRef} from '../firebase/db';

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
    let picture = e.target.files[0];
    let reader = new FileReader();

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

    storage.ref().child(userId + '/' + name)
      .put(picture)
      .then((snap) => {
        this.setState({loading: false});
        console.log(snap.metadata.fullPath)
        createRef(snap.metadata.fullPath, userId)
        })
      .catch(error => this.setState({error: error.message}));


    e.preventDefault();
  };

  render() {
    return (
      <Container>
        <Row>
          <Col>
            <form className="wrapper" onSubmit={this.onSubmit}>
              <DatePicker className="picker"
                          dateFormat="YYYY-MM-DD"
                          selected={this.state.date}
                          onChange={this.setDate}/>
              <div className="holder">
                <input type="file" id="picture" onChange={this.setPicture}/>
                <label className="uploader" htmlFor="picture">Add picture</label>
                {this.state.pictureUrl ?
                  <img className="viewer" src={this.state.pictureUrl} alt=""/>
                  : null}
              </div>
              <button className="button" type="submit">Add</button>
            </form>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default AddPage