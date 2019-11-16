import React, { Component } from 'react'

export default class SimpleFormComposition extends Component {
  state = {
    firstName: '',
  }

  handleFormChange = (e) => {
    const { name, value } = e.target
    this.setState({
      [name]: value
    }, () => { this.logFields() }) //like a promise
    this.handleCounter()
  }

  // we use function composition to make a prettier code
  handleIsValid = () => {
    this.setState(this.toggleIsValid)
    this.handleCounter()
  }

  toggleIsValid = state => {
    return {
      isValid: !state.isValid
    }
  }

  handleCounter = () => {
    this.setState({
      counter: this.state.counter + 1,
    })
  }

  logFields = () => {
    const { firstName, secondName } = this.state
    console.log(`Full name: ${firstName} ${secondName}`)
  }

  render() {
    return (
      <div className="Home mt-3 text-center">
        <h2>Simple form with function composition</h2>

        <div className="my-3">
          <h3>User Info</h3>
          <div>First Name: {this.state.firstName}</div>
          <div>Second Name: {this.state.secondName}</div>
          <div>Invalidate: {this.state.isValid ? 'valid' : 'invalid'}</div>
        </div>
        <div className="my-3">
          <h5>Form</h5>
          <div className="form-group">
            <label htmlFor="firstName">First name: </label>
            <input className="ml-2" 
                   type="text" 
                   name="firstName"
                   onChange={this.handleFormChange} />
          </div>
          <div className="form-group">
            <label htmlFor="secondName">Second name: </label>
            <input className="ml-2" 
                   type="text" 
                   name="secondName"
                   onChange={this.handleFormChange} />
          </div>
          <div className="form-group">
            <button className="ml-2"
                   type="toggle"
                   onClick={this.handleIsValid}>
                     Invalidate
            </button>
          </div>
        </div>
      </div>
    )
  }
}