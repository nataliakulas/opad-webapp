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
      tag: '',
      fav: false,
      date: null,
      error: '',
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

  setTag(e) {
    this.setState({tag: '#' + e.currentTarget.value.toLowerCase()})
  }

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
    const tag = this.state.tag;

    this.setState({loading: true});

    storage.ref().child(userId + '/' + name)
      .putString(data_url, 'data_url')
      .then((snap) => {
        this.setState({loading: false});
        createDbRef(snap.metadata.fullPath, name, tag, userId)
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
    let excluded = [];

    if (this.props.items.length > 0) {
      this.props.items.forEach(item => {
        let excludeDate = moment(item.name);

        excluded.push(excludeDate)
      })
    }

    return (
      <Container>
        <Row>
          <Col className="column-center" style={{height: '100vh'}}>
            <form className="column-center" onSubmit={this.onSubmit}>
              <div className="row-space-between" style={{width: '100%'}}>
                <DatePicker className="picker"
                            dateFormat="YYYY-MM-DD"
                            placeholderText="Add date"
                            selected={this.state.date}
                            excludeDates={excluded}
                            todayButton="Today"
                            maxDate={moment()}
                            onChange={this.setDate}/>
                <div className="row-space-between" style={{width: '30%'}}>
                  <div className="ico unfav disabled"/>
                  <div className="ico info-block disabled"/>
                </div>
              </div>
              <input type="text" placeholder="Add tag" style={{maxWidth: '100%'}} onChange={e => this.setTag(e)}/>
              {this.state.loading ?
                <div className="loader-wrapper">
                  <div className="loader"/>
                </div> :
                (this.state.complete ?
                    <div className="upload-wrapper">
                      <div className="column-center upload complete">
                        <p>Upload complete!</p>
                      </div>
                    </div> :
                    <div className="upload-wrapper">
                      <Cropper ref="cropper"
                               src={this.state.url ? this.state.url : ""}
                               style={{height: 400, width: 400}}
                               aspectRatio={1}
                               guides={true}
                               crop={this.cropItem}/>
                      <input type="file" id="item" onChange={this.setItem}/>
                      <label className={`column-center upload${this.state.item ? " has-item" : ""}`} htmlFor="item">
                        <p>Add picture</p>
                      </label>
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