import React, { Component } from 'react'
import Table from './Table';
import Form from "./Form";
import {
  Switch,
  Route,
  useRouteMatch,
} from "react-router-dom";

export class CharacterDetail extends Component {
  state = {
      characterId : -1,
      character: {},
  }

  shouldComponentUpdate(nextProps, nextState) {
    if(nextProps.match.params) {
    const { characterId } = nextProps.match.params

    fetch(`http://jsonplaceholder.typicode.com/users/${characterId}`)
        .then(res => res.json())
        .then((data) => {
          this.setState({
            character: {
                id: data.id, name: data.name, job: data.company.bs
            }
          })
        })
        .catch(console.log)
      return true;
    } else return false;
  }

  render() {
    return <h3>Requested character Name: {this.state.character.name}</h3>
  }
}

function CharacterDetailSwitcher() {
  const match = useRouteMatch()
  return <Switch>
      <Route path={`${match.path}/:characterId`} render={(props) => <CharacterDetail {...props} />} />
      <Route path={match.path}>
        <h3>Please select a character to see details</h3>
      </Route>
    </Switch>
}

export default class CharactersWithRest extends Component {
  state = {
    characters: [],
    editMode: false,
    addMode: false,
    editedCharacterIndex: -1,
  };

  componentDidMount() {
    fetch('http://jsonplaceholder.typicode.com/users')
        .then(res => res.json())
        .then((data) => {
          this.setState({
            characters: data.map(e => { 
              return {
                id: e.id, name: e.name, job: e.company.bs
              }
            })
          })
        })
        .catch(console.log)
  }
  
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