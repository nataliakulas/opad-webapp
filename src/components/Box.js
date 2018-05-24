import React from 'react';


class Box extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      flip: false,
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
        <div className="front box">
          <img src={this.props.src} alt={this.props.name}/>
          <div className="content column-center" onClick={this.flip}>
            <p>{this.props.name}</p>
          </div>
        </div>
        <div className="back column-space-around" onClick={this.flipBack}>
          <p>{this.props.name}</p>
          <ul>
            <li className="ico unfav disabled"/>
            <li className="ico download disabled"/>
            <li className="ico delete" onClick={this.props.remove}/>
          </ul>
        </div>
      </div>
    )
  }
}

export default Box;