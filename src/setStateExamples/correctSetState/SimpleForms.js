import React, { Component } from 'react'
import SimpleForm from './SimpleForm'
import SimpleFormAbstract from './SimpleFormAbstract'
import SimpleFormCheckbox from './SimpleFormCheckbox'
import SimpleFormToggle from './SimpleFormToggle'
import SimpleFormLogged from './SimpleFormLogged'
import SimpleFormComposition from './SimpleFormComposition'

export default class SimpleForms extends Component {
  render() {
    return (
      <div className="SimpleForms">
        <hr />
        <SimpleForm /> <hr/>
        <SimpleFormAbstract /> <hr/>
        <SimpleFormCheckbox /> <hr/>
        <SimpleFormToggle /> <hr/>
        <SimpleFormLogged /> <hr/>
        <SimpleFormComposition /> <hr/>
      </div>
    )
  }
}