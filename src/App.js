import React, { Component } from 'react';
import './App.css';
import Table from './components/Table';
import Form from "./components/Form";
import Minesweeper from './minesweeper/Minesweeper';

class App extends Component {
  state = {
    characters: [
      {name: 'John Smith', job: 'lover'},
      {name: 'Chester Bennington', job: 'singer'},
      {name: 'Stephen Hawking', job: 'scientist'},
      {name: 'Iron Man', job: 'superhero'},
      {name: 'Isaac Asimov', job: 'writer'}
    ],
    editMode: false,
    addMode: false,
    editedCharacterIndex: -1,
  };

  render() {
    const reactVar = `React`;
    const { characters, editMode, addMode, editedCharacterIndex } = this.state;

    return (
        <div className="App">
          <Minesweeper></Minesweeper>

          <h1>Hello {reactVar} World!</h1>

          <button onClick={this.addCharacter} disabled={editMode || addMode}>Add character</button>
          <Table characterData={characters}
                 editChar={this.editCharacter}
                 remChar={this.removeCharacter}
          />

          { addMode && 
            <Form handleSubmit={this.handleAdd} 
                  handleClose={this.handleClose} 
                  editMode={false} 
                  editedCharacter={null} /> 
          }
          {editMode && 
            <Form handleSubmit={this.handleEdit} 
                  handleClose={this.handleClose} 
                  editMode={true} 
                  editedCharacter={characters[editedCharacterIndex]} /> 
          }
        </div>
    );
  }

  removeCharacter = index => {
    const { characters } = this.state;

    this.setState({
      characters: characters.filter((character, i) => {
        return i !== index;
      })
    })
  }

  addCharacter = () => {
    this.setState({
      addMode: true,
      editMode: false,
    });
  }

  editCharacter = index => {
    this.setState({
      addMode: false,
      editMode: true,
      editedCharacterIndex: index
    });
  }

  handleAdd = character => {
    this.setState({ 
      addMode: false,
      editMode: false,
      characters: [...this.state.characters, character], 
      editedCharacterIndex: -1
    })
  }

  handleEdit = character => {
    const newCharacters = [...this.state.characters];
    newCharacters[this.state.editedCharacterIndex] = character;
    this.setState({ 
      addMode: false,
      editMode: false,
      characters: newCharacters, 
      editedCharacterIndex: -1
    })
  }

  handleClose = () => {
    this.setState({
      addMode: false,
      editMode: false,
    })
  }
}

export default App;
