import React from 'react';


class Box extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      flip: false
    }
  }

  flip = () => {
    this.setState({flip: true})
  };

  flipBack = () => {
    if (this.state.flip) {
      this.setState({flip: false})
    }
  };

  render() {
    return (
      <div className={`flip-wrapper${this.state.flip ? " flipped" : ""} ${this.props.className ? this.props.className : ""}`}
           style={{margin: this.props.margin}}>
        <div className={`front box ${this.props.className ? this.props.className : ""}`}>
          <img src={this.props.src} alt={this.props.name}/>
          <div className="content column-center" onClick={this.flip}>
            <p>{this.props.name}</p>
          </div>
        </div>
        <div className="back column-space-around" onClick={this.flipBack}>
          <p>{this.props.name}</p>
          <p>{this.props.tag}</p>
          <ul className="back-menu">
            <li className={`ico ${this.props.fav ? "fav" : "unfav"}`} onClick={this.props.toggle}/>
            <li className="ico download" onClick={this.props.download}/>
            <li className="ico delete" onClick={this.props.remove}/>
          </ul>
        </div>
      </div>
    )
  }
}

export default Box;