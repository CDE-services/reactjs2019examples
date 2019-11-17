import React, { Component } from 'react'
import {Mine, TileStateEnum} from './core'

const TILE_COLORS = ['transparent', 'blue', 'green', 'red', 'purple', 'maroon', 'black', 'gray', 'turquoise'];

export default class TileComponent extends Component {  
  render() {
    const { tile, row, col } = this.props
    const colStyle = {
      borderColor: 'white',
      padding: '0px 3px',
    }
    const tileStyle = {
      padding: '0px',
      margin: '0px',
      backgroundColor: tile.state === TileStateEnum.OPEN ? 'darkgray' : 'lightgray',
      border: '1px solid darkslategray',
      borderRadius: '3px',
      width: '24px',
      height: '24px',
      color: TILE_COLORS[tile.value],
    }

    return (
      <td style={colStyle}>
        <button style={tileStyle} 
                onClick={this.openTile}
                onContextMenu={this.markTile}>
          { tile.state === TileStateEnum.MARKED && 
                            <img alt={row + ',' + col} 
                                 src={require(`./img/mark.gif`)} /> }
          {
            tile.state === TileStateEnum.OPEN && (
              tile instanceof Mine ? 
                            <img alt={row + ',' + col}
                                 src={require(`./img/mine.gif`)} /> : 
                            <span>{tile.value}</span>
            )
          }
        </button>
      </td>
    )
  }

  openTile = (e) => {
    this.props.handleOpenTile(this.props.row, this.props.col)
  }

  markTile = (e) => {
    e.preventDefault()
    
    this.props.handleMarkTile(this.props.row, this.props.col)
  }
}
