import React from 'react';
import {Container, Row, Col} from 'react-grid-system';
import {connect} from 'react-redux';
import {compose} from 'recompose';

import {authCondition} from '../shared/helpers';
import authorization from '../shared/authorization';

import {getItems, removeItem, toggleFavItem} from '../duck/actions';
import {auth} from '../firebase/config';
import {removeDbRefs, updateDbRefs} from '../firebase/db';


const mapStateToProps = (state) => ({
  authUser: state.sessionState.authUser,
  items: state.itemsState.items
});

const mapDispatchToProps = dispatch => ({
  getItems: () => dispatch(getItems()),
  removeItem: name => dispatch(removeItem(name)),
  toggleFavItem: (name, fav) => dispatch(toggleFavItem(name, fav))
});

class FlukePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      url: '',
      tag: '',
      fav: false,
      clicked: false
    }
  }

  componentDidMount() {
    this.props.getItems();
  }

  removeItem(name) {
    const userId = auth.currentUser.uid;

    removeDbRefs(name, userId, this.props.removeItem(name));
    this.resetItemPreview();
  };

  toggleFavItem(name, fav) {
    const userId = auth.currentUser.uid;

    updateDbRefs(name, !fav, userId, this.props.toggleFavItem(name, !fav));
    this.setState({fav: !fav})
  };

  downloadItem(url, name) {
    if (url) {
      let xhr = new XMLHttpRequest();

      xhr.open('GET', url, true);
      xhr.responseType = 'blob';

      xhr.onload = () => {
        let blob = xhr.response;
        let fileName = name;
        let image = new Image();

        image.crossOrigin = "anonymous";
        image.src = url;

        image.onload = function () {
          let canvas = document.createElement('canvas');

          canvas.width = this.naturalWidth;
          canvas.height = this.naturalHeight;
          canvas.getContext('2d').drawImage(this, 0, 0);

          if (image.src.indexOf(".jpg") > -1) {
            blob = canvas.toDataURL("image/jpeg");
          } else if (image.src.indexOf(".png") > -1) {
            blob = canvas.toDataURL("image/png");
          } else if (image.src.indexOf(".gif") > -1) {
            blob = canvas.toDataURL("image/gif");
          } else {
            blob = canvas.toDataURL("image/png");
          }

          let tag = document.createElement('a');

          tag.href = blob;
          tag.download = fileName;
          tag.target = "_blank"
          document.body.appendChild(tag);
          tag.click();
          document.body.removeChild(tag);
        };
      };
      xhr.send();
    }


  }

  resetItemPreview = () => {
    this.setState({
      name: '',
      url: '',
      tag: '',
      fav: false,
    })
  };

  drawItem = () => {
    let items = [];

    if (this.props.items && this.props.items.length > 0) {
      items = this.props.items;
      let flukeItem = items[Math.floor(Math.random() * items.length)];

      this.setState({
        name: flukeItem.name,
        url: flukeItem.url,
        tag: flukeItem.tag,
        fav: flukeItem.fav,
        clicked: true
      })
    }
  };

  render() {
    return (
      <Container style={{minHeight: '100vh'}}>
        <Row>
          <Col>
            <div className="fullpage column-center">
              <p style={{marginBottom: 20}}>Fluke Picture a Day</p>
              <div className="preview-wrapper column-center">
                <div className="preview-box">
                  {this.state.url.length === 0 ?
                    <div className="preview-placeholder"/> :
                    <img src={this.state.url} alt={this.state.name}/>
                  }
                </div>
                {this.state.name.length === 0 ?
                  <div style={{height: 76}}/> :
                  <div>
                    <p>{this.state.name}</p>
                    <p>{this.state.tag}</p>
                  </div>
                }
                <ul>
                  <li className={`ico ${this.state.fav ? "fav" : "unfav"}${this.props.items.length <= 1 ? " disabled" : ""}`} onClick={() => this.toggleFavItem(this.state.name, this.state.fav)}/>
                  <li className={`ico download${this.props.items.length <= 1 ? " disabled" : ""}`} onClick={() => this.downloadItem(this.state.url, this.state.name)}/>
                  <li className={`ico delete${this.props.items.length <= 1 ? " disabled" : ""}`} onClick={() => this.removeItem(this.state.name)}/>
                </ul>
              </div>
              <button className="button" type="button" disabled={this.props.items.length <= 1} onClick={this.drawItem}>
                {this.props.items.length <= 1 ? "Add more pictures" :
                  (!this.state.clicked ? "Try your luck!" : "Try again!")
                }
              </button>
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
)(FlukePage)