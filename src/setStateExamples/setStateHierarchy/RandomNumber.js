import React, { Component } from 'react'
import Child from './Child'
import ChildBrother from './ChildBrother'
//import ChildSister from './ChildSister'

export default class RandomNumber extends Component {
  state = {
    magicNumber: 23,
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.randomMagicNumber(), 1000)
  }

  componentWillUnmount() {
    clearInterval(this.timerID)
  }

  randomMagicNumber = () => {
    return this.setState({
      magicNumber: Math.random(100),
    })
  }

  render() {
    return (
      <div className="Home">
        <ul>
          <li>Home: { this.state.magicNumber }</li>
          <li>Child: <Child magicNumber={this.state.magicNumber}/></li>
          <li>Brother: <ChildBrother magicNumber={this.state.magicNumber}/></li>
          {/* <li>Sister: <ChildOfHomeSister magicNumber={this.state.magicNumber}/></li> */}
          
        </ul>
      </div>
    )
  }
}