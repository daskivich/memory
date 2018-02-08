import React from 'react';
import ReactDOM from 'react-dom';
import { Button } from 'reactstrap';

export default function run_memory(root, channel) {
  ReactDOM.render(<Memory channel={channel}/>, root);
}

/*
state
  vals: 16 string values (2 pairs of 'A' through 'H')
  comp: array of completed indexes
  sel: array of selected indexes
  fails: number of failed matches (used to calculate score)
*/
class Memory extends React.Component {
  constructor(props) {
    super(props);
    this.channel = props.channel;

    this.state = {
      vals: ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D',
        'E', 'E', 'F', 'F', 'G', 'G', 'H', 'H'],
      comp: [],
      sel: [],
      fails: 0
    };

    this.channel.join()
      .receive("ok", this.gotView.bind(this))
      .receive("error", resp => {console.log("Unable to join", resp)});
  }

  gotView(view) {
    console.log("New view", view);
    console.log("View.game: ", view.game);
    this.setState(view.game);
  }

  sendSelection(ev) {
    this.channel.push("select", { index: 0 })
      .receive("ok", this.gotView.bind(this));
  }

  // calculates the score based on the completed array and number of fails
  // each completed match is worth 8, each failed attempt is worth -1
  getScore() {
    return (this.state.comp.length / 2) * 8 - this.state.fails;
  }

  // resets the state of the game with newly randomized tile values
  // waits a second before executing to allow previously waiting calls
  // to complete their execution
  reset() {
    setTimeout(() => this.setState({
          vals: resetValues(),
          comp: [],
          sel: [],
          fails: 0
        }), 1000);
  }

  render() {
    return (
      <div>
        <div className="container game">
          <div className="row">
            <Tile
              state={this.state}
              select={this.sendSelection.bind(this)}
              index={0} />
            <Tile
              state={this.state}
              select={this.sendSelection.bind(this)}
              index={1} />
            <Tile
              state={this.state}
              select={this.sendSelection.bind(this)}
              index={2} />
            <Tile
              state={this.state}
              select={this.sendSelection.bind(this)}
              index={3} />
          </div>
          <div className="row">
            <Tile
              state={this.state}
              select={this.sendSelection.bind(this)}
              index={4} />
            <Tile
              state={this.state}
              select={this.sendSelection.bind(this)}
              index={5} />
            <Tile
              state={this.state}
              select={this.sendSelection.bind(this)}
              index={6} />
            <Tile
              state={this.state}
              select={this.sendSelection.bind(this)}
              index={7} />
          </div>
          <div className="row">
            <Tile
              state={this.state}
              select={this.sendSelection.bind(this)}
              index={8} />
            <Tile
              state={this.state}
              select={this.sendSelection.bind(this)}
              index={9} />
            <Tile
              state={this.state}
              select={this.sendSelection.bind(this)}
              index={10} />
            <Tile
              state={this.state}
              select={this.sendSelection.bind(this)}
              index={11} />
          </div>
          <div className="row">
            <Tile
              state={this.state}
              select={this.sendSelection.bind(this)}
              index={12} />
            <Tile
              state={this.state}
              select={this.sendSelection.bind(this)}
              index={13} />
            <Tile
              state={this.state}
              select={this.sendSelection.bind(this)}
              index={14} />
            <Tile
              state={this.state}
              select={this.sendSelection.bind(this)}
              index={15} />
          </div>
          <div className="row">
            <div className="col-6">
              <h3>Current Score: {this.getScore()}</h3>
            </div>
            <div className="col-6">
              <Button className="reset" color="warning"
                onClick={this.reset.bind(this)}>
                reset
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// the main component of the game containing a Button
function Tile(props) {
  let state = props.state;
  let index = props.index;

  var clr;
  var disp;

  if (state.comp.includes(index)) {
    clr = "success";
    disp = "";
  } else if (state.sel.includes(index)) {
    clr = "primary";
    disp = state.vals[index];
  } else {
    clr = "secondary";
    disp = "";
  }

  return (
    <div className="col-3">
      <div className="spacer"></div>
      <Button className="memCard" color={clr} onClick={props.select}>
        {disp}
      </Button>
    </div>
  );
}
