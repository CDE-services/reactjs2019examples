import React, { Component } from 'react'

export default class SimpleFormLogged extends Component {
  state = {
    firstName: '',
  }

  //mixed types of inputs makes us change this method to handle the data
  handleFormChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    })
    this.handleCounter()
    this.logFields()
  }

  // with callback:
  // handleFormChange = (e) => {
  //   const { name, value } = e.target
  //   this.setState({
  //     [name]: value
  //   }, () => { this.logFields() }) //like a promise
  //   this.handleCounter()
  // }

  // we use previous state but only locally, so it's okay
  handleIsValid = () => {
    this.setState(state => {
      return {
        isValid: !state.isValid
      }
    })
    this.handleCounter()
  }

  // different changes to state reused in other methods should be
  // in separate methods for React to handle it by itself
  handleCounter = () => {
    this.setState({
      counter: this.state.counter + 1,
    })
  }

  // log is one change before the output because state is async
  // need to use callback in handleFormChange:
  // setState(updater[, callback])
  logFields = () => {
    const { firstName, secondName } = this.state
    console.log(`Full name: ${firstName} ${secondName}`)
  }

  render() {
    return (
      <div className="Home mt-3 text-center">
        <h2>Simple form logged</h2>

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