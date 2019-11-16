import React, { Component } from 'react'
import {Mine, Clue, GameStateEnum, TileStateEnum} from './core'
import FieldComponent from './Field'

export default class Minesweeper extends Component {
  constructor(props) {
    super(props)
    const initialState = {
      rowCount: 10,
      colCount: 10,
      mineCount: 10
    }
    this.state = {
      rowCount: initialState.rowCount,
      colCount: initialState.colCount,
      mineCount: initialState.mineCount,
      field: this.generateField(initialState),
      initialState: initialState,
      markedTiles: 0,
      gameState: GameStateEnum.PLAYING,
    }
  }
  
  render() {
    const {mineCount, markedTiles, rowCount, colCount, gameState} = this.state
    return (
      <div>
        <h1>Minesweeper</h1>
        <h4>remaining mines: {mineCount - markedTiles}</h4>
        {(() => {
          switch(gameState) {
            case GameStateEnum.WON:
              return <div><h1>You WON!!!</h1> <button onClick={this.newGame}>New Game</button></div>
            case GameStateEnum.LOST:
              return <div><h1>YOU HIT A MINE!</h1> <button onClick={this.newGame}>New Game</button></div>
            default:
              return <div></div>
          }
        })()}
        <FieldComponent rowCount={rowCount} 
          colCount={colCount}
           field={this.state.field}
           handleOpenTile={this.openTile}
           handleMarkTile={this.markTile} />
      </div>
    )
  }

  generateField(initialState) {
    const {rowCount, colCount, mineCount} = initialState
    let field = [];

    for(let row = 0; row < rowCount; row++) {
      field.push([]);
      field[row].length = colCount;
    }

    let randomRow, randomCol;
    let pocetMin = 0;

    do {
      randomRow = Math.floor(Math.random() * rowCount);
      randomCol = Math.floor(Math.random() * colCount);
      
      if(!field[randomRow][randomCol]) {
        field[randomRow][randomCol] = new Mine();
        pocetMin++;
      }
    } while (pocetMin < mineCount);
    
    for(let row = 0; row < rowCount; row++) {
      for(let col = 0; col < colCount; col++) {
        if(!field[row][col]) {
          field[row][col] = new Clue(this.countAdjacentMines(row, col, field, initialState));
        }
      }
    }

    return field;
  }

  countAdjacentMines = (row, col, field, initialState) => {
    const { rowCount, colCount } = initialState;

    let count = 0;
    for(let r = -1; r <= 1; r++) {
      const actRow = row+r;
      if(actRow >= 0 && actRow < rowCount) {
        for(let c = -1; c <= 1; c++) {
          const actCol = col+c;
          if(actCol >= 0 && actCol < colCount) {
            if(field[actRow][actCol] && field[actRow][actCol] instanceof Mine) {
              count++;
            }
          }
        }
      }
    }

    return count;
  }

  openTile = (row, col) => {
    const { field, gameState } = this.state
    if(gameState !== GameStateEnum.PLAYING) return;
    
    if(field[row][col] instanceof Mine) {
      this.setState({
        gameState: GameStateEnum.LOST
      })
      return;
    }
    
    if(field[row][col].state === TileStateEnum.CLOSED) {
      const newField = this.deepCopyField();
      this.openTileRecursive(row, col, newField);

      this.setState({
        field: newField
      })
    }

    if(this.isGameWon()) {
      this.setState({
        gameState: GameStateEnum.WON
      })
      return;
    }
  }

  openTileRecursive(row, col, newField) {
    const tile = newField[row][col];
    if(tile.state === TileStateEnum.CLOSED) {
      tile.state = TileStateEnum.OPEN

      if(tile instanceof Clue && tile.value === 0) {
        this.openAdjacentTiles(row, col, newField);
      }
    }
  }

  openAdjacentTiles = (row, col, newField) => {
    const { rowCount, colCount } = this.state

    for(let r = -1; r <= 1; r++) {
      const actRow = row+r;
      if(actRow >= 0 && actRow < rowCount) {
        for(let c = -1; c <= 1; c++) {
          const actCol = col+c;
          if(actCol >= 0 && actCol < colCount) {
            this.openTileRecursive(actRow, actCol, newField)
          }
        }
      }
    }
  }

  markTile = (row, col) => {
    const { markedTiles, gameState } = this.state

    if(gameState !== GameStateEnum.PLAYING) return;

    const newField = this.deepCopyField();
    const tile = newField[row][col];
    if(tile.state === TileStateEnum.MARKED) {
      tile.state = TileStateEnum.CLOSED
    } else if (tile.state === TileStateEnum.CLOSED) {
      tile.state = TileStateEnum.MARKED
    }
    this.setState({
      field: newField,
      markedTiles: tile.state === TileStateEnum.MARKED ? markedTiles + 1 : markedTiles - 1,
    })
  }

  isGameWon = () => {
    return (this.state.mineCount === this.state.rowCount * this.state.colCount - this.countOpenTiles())
  }

  newGame = () => {
    this.setState({
      field: this.generateField(this.state.initialState),
      gameState: GameStateEnum.PLAYING,
    })
  }

  countOpenTiles() {
    let count = 0
    for(const row of this.state.field) {
      for(const tile of row) {
        if(tile.state === TileStateEnum.OPEN) {
          count++
        }
      }
    }
    return count
  }

  deepCopyField() {
    const newField = [];
    for(let r = 0; r < this.state.rowCount; r++) {
      newField.push([...this.state.field[r]]);
    }
    console.log(newField);
    return newField;
  }
}