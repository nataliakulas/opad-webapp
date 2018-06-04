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
      toggle: false
    }
  }

  componentDidMount() {
    this.props.getItems();
  }

  componentWillUnmount() {
    this.props.getItems(null)
  }

  toggleView = () => {
    this.setState({toggle: !this.state.toggle})
  };


  setDate = (date) => {
    this.setState({date: date, complete: false})
  };

  setFav = () => {
    this.setState({fav: !this.state.fav})
  };

  setTag(e) {
    this.setState({tag: e.currentTarget.value.toLowerCase()})
  }

  cropItem = () => {
    if (this.refs.cropper) {
      let data_url = this.refs.cropper.getCroppedCanvas().toDataURL();

      this.setState({data_url: data_url})
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
    const tag = "#" + this.state.tag;
    const fav = this.state.fav;

    this.setState({loading: true});

    storage.ref().child(userId + '/' + name)
      .putString(data_url, 'data_url')
      .then((snap) => {
        this.setState({loading: false});
        createDbRef(snap.metadata.fullPath, name, tag, fav, userId)
      })
      .then(() => this.setState({
        complete: true,
        item: '',
        url: '',
        data_url: '',
        tag: '',
        fav: false,
        date: null,
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
            <form className="fullpage column-center" onSubmit={this.onSubmit}>
              {this.state.loading ?
                <div className="loader-wrapper visible-xs">
                  <div className="loader visible-xs"/>
                </div> :
                <div className={`upload-toggle-wrapper flip-box${this.state.toggle ? " toggled flipped" : ""}`}>
                  <div>
                    <DatePicker className="picker"
                                dateFormat="YYYY-MM-DD"
                                placeholderText="Add date"
                                popperPlacement="left-start"
                                selected={this.state.date}
                                excludeDates={excluded}
                                todayButton="Today"
                                maxDate={moment()}
                                onChange={this.setDate}/>
                    <div>
                      <div className={`ico ${this.state.fav ? "fav" : "unfav"}`} onClick={this.setFav}/>
                      <div className="ico info-block disabled"/>
                    </div>
                  </div>
                  <input type="text" className="tag" placeholder="Add tag" value={this.state.tag} onChange={e => this.setTag(e)}/>
                  <button disabled={this.state.complete || !this.state.date || !this.state.tag || !this.state.data_url}
                          className="button" type="submit">Add
                  </button>
                </div>
              }
              {this.state.loading ?
                <div className="loader-wrapper hidden-xs">
                  <div className="loader hidden-xs"/>
                </div> :
                (this.state.complete ?
                    <div className="upload-wrapper">
                      <div className="column-center upload complete">
                        <p>Upload complete!</p>
                      </div>
                    </div> :
                    <div className={`upload-wrapper${this.state.toggle ? " toggled" : ""}`}>
                      <Cropper ref="cropper"
                               src={this.state.url ? this.state.url : ""} to
                               className="upload-crop"
                               aspectRatio={1}
                               guides={true}
                               crop={this.cropItem}/>
                      <input type="file" id="item" hidden onChange={this.setItem}/>
                      <label className={`column-center upload${this.state.item ? " has-item" : ""}`} htmlFor="item">
                        <p>Add picture</p>
                      </label>
                    </div>
                )
              }
              <button disabled={this.state.complete || !this.state.date || !this.state.tag || !this.state.data_url}
                      className="button upload-button" type="submit">Add
              </button>
              <div className={`ico toggle`} onClick={this.toggleView}/>
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