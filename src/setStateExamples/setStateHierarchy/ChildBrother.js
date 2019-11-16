import React, { Component } from 'react'

export default class ChildBrother extends Component {
  state = {
    magicNumber: 0,
  }

  // not invoked as the component is not re-rendered anymore
  componentDidMount() {
    this.setState({
      magicNumber: this.props.magicNumber,
    })
  }

  // does not work because render() doesn't know that a prop has changed so it is not triggering the re-rendering
  render() {
    return (
      <span className="ChildOfHomeBrother">
        {this.state.magicNumber}
      </span>
    )
  }
}