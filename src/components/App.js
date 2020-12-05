import React, { Component } from "react";
import BoardRow from "./BoardRow";
import BoardForm from "./BoardForm";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      maxNo: 1,
      boards: [],
    };
    this.child = React.createRef();
    this.handleSaveData = this.handleSaveData.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.handleSelectRow = this.handleSelectRow.bind(this);
  }

  handleSaveData(data) {
    let boards = this.state.boards;
    if (data.brdno === null || data.brdno === "" || data.brdno === undefined) {
      // new : insert
      this.setState({
        maxNo: this.state.maxNo + 1,
        boards: boards.concat({
          brdno: this.state.maxNo,
          brddate: new Date(),
          brdwriter: data.brdwriter,
          brdtitle: data.brdtitle,
        }),
      });
    } else {
      // Update
      this.setState({
        boars: boards.map((row) =>
          data.brdno === row.brdno ? { ...data } : row
        ),
      });
    }
  }

  handleRemove(brdno) {
    this.setState({
      boards: this.state.boards.filter((row) => row.brdno !== brdno),
    });
  }

  handleSelectRow(row) {
    this.child.current.handleSelectRow(row);
  }

  render() {
    const { boards } = this.state;
    return (
      <div>
        <BoardForm onSaveData={this.handleSaveData} ref={this.child} />
        <table border="1">
          <tbody>
            <tr align="center">
              <td width="50">No.</td>
              <td width="300">Title</td>
              <td width="100">Name</td>
              <td width="100">Date</td>
            </tr>
            {boards.map((row) => (
              <BoardRow
                key={row.brdno}
                row={row}
                onRemove={this.handleRemove}
                onSelectRow={this.handleSelectRow}
              />
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default App;
