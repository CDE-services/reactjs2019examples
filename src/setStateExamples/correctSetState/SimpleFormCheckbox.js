import React, { Component } from 'react'

export default class SimpleFormCheckbox extends Component {
  state = {
    firstName: '',
  }

  //mixed types of inputs makes us change this method to handle the data
  handleFormChange = (e) => {
    const { checked, name, value, type } = e.target;
    const valueToUpdate = type === 'checkbox' ? checked : value;
    this.setState({
      [name]: valueToUpdate,
      counter: this.state.counter + 1,
    })
  }

  render() {
    return (
      <div className="Home mt-3 text-center">
        <h2>Simple form with checkbox</h2>

        <div className="my-3">
          <h3>User Info</h3>
          <div>First Name: {this.state.firstName}</div>
          <div>Second Name: {this.state.secondName}</div>
          <div>Data {this.state.checked ? 'valid' : 'invalid'}</div>
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
            <input className="ml-2"
                   type="checkbox"
                   name="checked"
                   onChange={this.handleFormChange}/>
            <label htmlFor="checked">Data is valid</label>
          </div>
        </div>
      </div>
    )
  }
}