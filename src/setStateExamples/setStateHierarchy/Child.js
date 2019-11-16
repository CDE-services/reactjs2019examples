import React, { Component } from 'react'

export default class Child extends Component {
  render() {
    return (
      <span className="ChildOfHome">
        {this.props.magicNumber}
      </span>
    )
  }
}