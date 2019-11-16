import React, { Component } from 'react'
import Table from './Table';
import Form from "./Form";
import {
  Switch,
  Route,
  useRouteMatch,
  useParams
} from "react-router-dom";

function CharacterDetail() {
  let { characterId } = useParams()
  return <h3>Requested character Id: {characterId}</h3>
}

function CharacterDetailSwitcher() {
  const match = useRouteMatch()
  return <Switch>
      <Route path={`${match.path}/:characterId`}>
        <CharacterDetail />
      </Route>
      <Route path={match.path}>
        <h3>Please select a character to see details</h3>
      </Route>
    </Switch>
}

export default class Characters extends Component {
  state = {
    characters: [
      {id: 0, name: 'John Smith', job: 'lover'},
      {id: 1, name: 'Chester Bennington', job: 'singer'},
      {id: 2, name: 'Stephen Hawking', job: 'scientist'},
      {id: 3, name: 'Iron Man', job: 'superhero'},
      {id: 4, name: 'Isaac Asimov', job: 'writer'}
    ],
    editMode: false,
    addMode: false,
    editedCharacterIndex: -1,
  };
  
  render() {
    const reactVar = `React`;
    const { characters, editMode, addMode, editedCharacterIndex } = this.state;

    return (
        <div>
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
          <CharacterDetailSwitcher />
        </div>
    )
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