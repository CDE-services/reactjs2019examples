import React, { Component } from 'react'

import TileComponent from './Tile'

export default class FieldComponent extends Component {
  render() {
    const tableStyle = {width: 'auto'}
    const rows = []
    for(let r = 0; r < this.props.rowCount; r++){
      const cols = []
      for (let c = 0; c < this.props.colCount; c++) {
        cols.push(
          <TileComponent key={'c'+(r+1*c+1)} 
                         row={r} 
                         col={c} 
                         handleOpenTile={this.props.handleOpenTile} 
                         handleMarkTile={this.props.handleMarkTile}
                         tile={this.props.field[r][c]} />
        )
      }
      rows.push(<tr key={'r'+r}>{cols}</tr>)
    }
    return <table style={tableStyle}><tbody>{rows}</tbody></table>
  }
}