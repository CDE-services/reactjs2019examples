import React, {Component} from 'react'

class Form extends Component {
  constructor(props) {
    super(props)
    console.log(props);

    const { editedCharacter } = props;

    if(editedCharacter) {
      this.initialState = {
        name: editedCharacter.name,
        job: editedCharacter.job,
      }
    } else {
      this.initialState = {
        name: '',
        job: '',
      }
    }

    this.state = this.initialState
  }

  render() {
    const {name, job} = this.state
    const {editMode} = this.props

    const pb = {
      marginRight: '8px',
    };

    return (
        <div>
          <h1>
            {editMode ? 'Edit character' : 'Add character'}
          </h1>
          <form>
            <label>Name:</label>
            <input
                type="text"
                name="name"
                value={name}
                onChange={this.handleChange} />
            <label>Job:</label>
            <input
                type="text"
                name="job" //name tu musi byt, podla toho identifikuje nazov premennej
                value={job}
                onChange={this.handleChange} />
            <input
                style={pb}
                type="button"
                value="Submit"
                onClick={this.submitForm} />
            <input
                style={pb}
                type="button"
                value="Close"
                onClick={this.closeForm} />
          </form>
        </div>
    )
  }

  handleChange = event => {
    const {name, value} = event.target

    this.setState({
      [name]: value,
    })
  }

  submitForm = () => {
    if(this.state.name === '') {
      console.log('you can not add a character with an empty name')
      return;
    }
    this.props.handleSubmit(this.state) //this.state je vlastne {name, job}
    this.setState(this.initialState)
  }

  closeForm = () => {
    this.props.handleClose()
  }
}

export default Form;