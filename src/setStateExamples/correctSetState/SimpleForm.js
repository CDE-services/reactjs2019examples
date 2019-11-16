import React, { Component } from 'react'

export default class SimpleForm extends Component {
  state = {
    firstName: '',
  }

  handleFormChange = (e) => {
    this.setState({
      firstName: e.target.value,
    })
  }

  render() {
    return (
      <div className="Home mt-3 text-center">
        <h1>Simple form</h1>

        <div className="my-3">
          <h3>User Info</h3>
          <div>First Name: {this.state.firstName}</div>
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
        </div>
      </div>
    )
  }
}
