import React, { Component } from 'react'

export default class SimpleFormAbstract extends Component {
  state = {
    firstName: '',
  }

  //generic setState method that works with any fields
  handleFormChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    })
  }

  render() {
    return (
      <div className="Home mt-3 text-center">
        <h1>Simple form - with abstract handle method</h1>

        <div className="my-3">
          <h3>User Info</h3>
          <div>First Name: {this.state.firstName}</div>
          <div>Last Name: {this.state.lastName}</div>
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
            <label htmlFor="firstName">Last name: </label>
            <input className="ml-2" 
                   type="text" 
                   name="lastName"
                   onChange={this.handleFormChange} />
          </div>
        </div>
      </div>
    )
  }
}
