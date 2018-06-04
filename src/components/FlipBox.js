import React from 'react';


export default class FlipBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {flip: this.props.flip}
  }

  componentWillReceiveProps(props) {
    if (this.props.flip !== props.flip) {
      this.setState({flip: props.flip})
    }
  }

  render() {
    return (
      <div className={`flip-box flip-wrapper column-center${this.state.flip ? " flipped" : ""}${this.props.className ? (" " + this.props.className) : ""}`}>
        {this.props.children}
      </div>
    )
  }
}