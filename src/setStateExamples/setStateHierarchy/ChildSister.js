import React, { Component } from 'react'

export default class ChildSister extends Component {
  state = {
    magicNumber: 0,
  }

  // not invoked as the component is not re-rendered anymore
  componentDidMount() {
    this.setState({
      magicNumber: this.props.magicNumber,
    })
  }

  // this causes infinite loop
  // ! unnecessary and unclean code !
  componentDidUpdate(updatedVal) {
    this.setState(updatedVal)
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