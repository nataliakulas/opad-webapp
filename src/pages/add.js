import React from 'react';
import {Container, Row, Col} from 'react-grid-system';
import DatePicker from 'react-datepicker';
import Cropper from 'react-cropper';
import {connect} from 'react-redux';
import {compose} from 'recompose';
import moment from 'moment';

import {authCondition} from '../shared/helpers';
import authorization from '../shared/authorization';

import {auth, storage} from '../firebase/config';
import {createDbRef} from '../firebase/db';
import {getItems} from '../duck/actions';


const mapStateToProps = (state) => ({
  authUser: state.sessionState.authUser,
  items: state.itemsState.items
});

const mapDispatchToProps = dispatch => ({
  getItems: () => dispatch(getItems())
});

class AddPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      complete: false,
      item: '',
      url: '',
      data_url: '',
      date: moment(),
      error: ''
    }
  }

  componentDidMount() {
    this.props.getItems();
  }

  componentWillUnmount() {
    this.props.getItems(null)
  }

  cropItem = () => {
    let data_url = this.refs.cropper.getCroppedCanvas().toDataURL();

    this.setState({data_url: data_url})
  };

  setDate = (date) => {
    let dates = [];

    if (this.props.items.length > 0) {
      this.props.items.forEach(item => {
        dates.push(item.name)
      });

      if (dates.includes(moment(date).format('YYYY-MM-DD'))) {
        alert("One picture from this day already exist! Choose another date")
      } else {
        this.setState({date: date, complete: false})
      }
    }
  };

  setItem = (e) => {
    let item = e.target.files[0];
    let reader = new FileReader();

    reader.onloadend = () => {
      this.setState({item: item, url: reader.result})
    };

    reader.readAsDataURL(item);
  };

  onSubmit = (e) => {
    const userId = auth.currentUser.uid;
    const name = moment(this.state.date).format('YYYY-MM-DD');
    const data_url = this.state.data_url;

    this.setState({loading: true});

    storage.ref().child(userId + '/' + name)
      .putString(data_url, 'data_url')
      .then((snap) => {
        this.setState({loading: false});
        createDbRef(snap.metadata.fullPath, name, userId)
      })
      .then(() => this.setState({
        complete: true,
        item: '',
        url: '',
        data_url: '',
        error: ''
      }))
      .catch(error => this.setState({error: error.message}));

    e.preventDefault();
  };

  render() {
    return (
      <Container>
        <Row>
          <Col className="column-center" style={{height: '100vh'}}>
            <form className="column-center" onSubmit={this.onSubmit}>
              <DatePicker className="picker"
                          dateFormat="YYYY-MM-DD"
                          selected={this.state.date}
                          maxDate={moment()}
                          onChange={this.setDate}/>
              {this.state.loading ?
                <div className="loader">Loading...</div> :
                (this.state.complete ?
                    <div style={{width: 400, height: 400}}>
                      Upload complete add another picture from another day or go to dashboard to view them</div> :
                    <div className="upload-wrapper">
                      <Cropper ref="cropper"
                               src={this.state.url ? this.state.url : ""}
                               style={{height: 400, width: 400}}
                               aspectRatio={1}
                               guides={true}
                               crop={this.cropItem}/>
                      <input type="file" id="item" onChange={this.setItem}/>
                      <label className={`upload${this.state.item ? " has-item" : ""}`} htmlFor="item">Add picture</label>
                    </div>
                )
              }
              <button disabled={this.state.complete} className="button" type="submit">Add</button>
            </form>
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
)(AddPage)