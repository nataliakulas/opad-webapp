import React from 'react';
import {Container, Row, Col} from 'react-grid-system';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';
import '../styles/datepicker.css'

import {auth, storage} from '../firebase/config';
import {createDbRef} from '../firebase/db';

class AddPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      item: '',
      item_url: '',
      date: moment(),
      error: ''
    }
  }

  setDate = (date) => {
    this.setState({date: date})
  };

  setPicture = (e) => {
    let item = e.target.files[0];
    let reader = new FileReader();

    reader.onloadend = () => {
      this.setState({item: item, item_url: reader.result})
    };

    reader.readAsDataURL(item)
  };

  onSubmit = (e) => {
    const userId = auth.currentUser.uid;
    const name = moment(this.state.date).format('YYYY-MM-D');
    const item = this.state.item;

    this.setState({loading: true});
    storage.ref().child(userId + '/' + name)
      .put(item)
      .then((snap) => {
        this.setState({loading: false});
        createDbRef(snap.metadata.fullPath, name, userId)
      })
      .catch(error => this.setState({error: error.message}));

    e.preventDefault();
  };

  render() {
    return (
      <Container>
        <Row>
          <Col>
            <form className="column-center" style={{height: '50vh', marginTop: '25vh'}} onSubmit={this.onSubmit}>
              <DatePicker className="picker"
                          dateFormat="YYYY-MM-DD"
                          selected={this.state.date}
                          maxDate={moment()}
                          onChange={this.setDate}/>
              <div className="holder">
                <input type="file" id="picture" onChange={this.setPicture}/>
                <label className="uploader" htmlFor="picture">Add picture</label>
                {this.state.item_url ?
                  <img className="viewer" src={this.state.item_url} alt=""/>
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