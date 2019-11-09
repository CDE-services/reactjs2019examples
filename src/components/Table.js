import React, { Component } from 'react'

const TableHeader = () => {return (
  <thead>
    <tr>
      <th>Name</th>
      <th>Job</th>
      <th></th>
    </tr>
  </thead>
)};
const TableBody = props => {
  const pb = {
    marginRight: '8px',
  };

  const rows = props.charData.map((row, index) => {
    return <tr key={index}>
      <td>{row.name}</td>
      <td>{row.job}</td>
      <td>
        <button
            style={pb}
            onClick={() => props.editChar(index)}>
          Edit character
        </button>
        <button
            style={pb}
            onClick={() => props.remChar(index)}>
          Remove character
        </button>
      </td>
    </tr>
  });
  return <tbody>{rows}</tbody>
};

export class Table extends Component {
  render() {
    const { characterData, editChar, remChar } = this.props
    
    return (
      <table>
        <TableHeader />
        <TableBody charData={characterData} editChar={editChar} remChar={remChar}/>
      </table>
    )
  }
}

export default Table
