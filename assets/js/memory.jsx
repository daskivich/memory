import React from 'react';
import ReactDOM from 'react-dom';
import { Button } from 'reactstrap';

export default function run_memory(root) {
  ReactDOM.render(<Memory />, root);
}

/*
state:
16 strings (8 value pairs)
16 booleans (complete or incomplete)
selectedFirst index
selectedSecond index
score (add for match, subtract for miss)
*/
class Memory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      vals: resetValues(),
      comp: [],
      sel: []
    };
  }

  update(selected) {
    if (this.state.sel.length == 2) {
      this.setState({
        vals: this.state.vals,
        comp: this.state.comp,
        sel: []
      });
    } else if (this.state.comp.includes(selected) || this.state.sel.includes(selected)) {
      return;
    } else if (this.state.sel.length == 0) {
      this.setState({
        vals: this.state.vals,
        comp: this.state.comp,
        sel: [selected]
      });
    } else if (this.state.sel.length == 1) {
      if (this.state.vals[this.state.sel[0]] == this.state.vals[selected]) {
        var newComp = [];

        for(var i = 0; i < this.state.comp.length; i++) {
          newComp.push(this.state.comp[i]);
        }

        newComp.push(this.state.sel[0]);
        newComp.push(selected);

        this.setState({
          vals: this.state.vals,
          comp: newComp,
          sel: []
        });
      } else {
        this.setState({
          vals: this.state.vals,
          comp: this.state.comp,
          sel: [this.state.sel[0], selected]
        });
      }
    }
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <Tile
            val={this.state.vals[0]}
            comp={this.state.comp.includes(0)}
            sel={this.state.sel.includes(0)}
            update={this.update.bind(this)}
            index={0} />
          <Tile
            val={this.state.vals[1]}
            comp={this.state.comp.includes(1)}
            sel={this.state.sel.includes(1)}
            update={this.update.bind(this)}
            index={1} />
          <Tile val={this.state.vals[2]}
            comp={this.state.comp.includes(2)}
            sel={this.state.sel.includes(2)}
            update={this.update.bind(this)}
            index={2} />
          <Tile val={this.state.vals[3]}
            comp={this.state.comp.includes(3)}
            sel={this.state.sel.includes(3)}
            update={this.update.bind(this)}
            index={3} />
        </div>
        <div className="row">
          <Tile val={this.state.vals[4]}
            comp={this.state.comp.includes(4)}
            sel={this.state.sel.includes(4)}
            update={this.update.bind(this)}
            index={4} />
          <Tile val={this.state.vals[5]}
            comp={this.state.comp.includes(5)}
            sel={this.state.sel.includes(5)}
            update={this.update.bind(this)}
            index={5} />
          <Tile val={this.state.vals[6]}
            comp={this.state.comp.includes(6)}
            sel={this.state.sel.includes(6)}
            update={this.update.bind(this)}
            index={6} />
          <Tile val={this.state.vals[7]}
            comp={this.state.comp.includes(7)}
            sel={this.state.sel.includes(7)}
            update={this.update.bind(this)}
            index={7} />
        </div>
        <div className="row">
          <Tile val={this.state.vals[8]}
            comp={this.state.comp.includes(8)}
            sel={this.state.sel.includes(8)}
            update={this.update.bind(this)}
            index={8} />
          <Tile val={this.state.vals[9]}
            comp={this.state.comp.includes(9)}
            sel={this.state.sel.includes(9)}
            update={this.update.bind(this)}
            index={9} />
          <Tile val={this.state.vals[10]}
            comp={this.state.comp.includes(10)}
            sel={this.state.sel.includes(10)}
            update={this.update.bind(this)}
            index={10} />
          <Tile val={this.state.vals[11]}
            comp={this.state.comp.includes(11)}
            sel={this.state.sel.includes(11)}
            update={this.update.bind(this)}
            index={11} />
        </div>
        <div className="row">
          <Tile val={this.state.vals[12]}
            comp={this.state.comp.includes(12)}
            sel={this.state.sel.includes(12)}
            update={this.update.bind(this)}
            index={12} />
          <Tile val={this.state.vals[13]}
            comp={this.state.comp.includes(13)}
            sel={this.state.sel.includes(13)}
            update={this.update.bind(this)}
            index={13} />
          <Tile val={this.state.vals[14]}
            comp={this.state.comp.includes(14)}
            sel={this.state.sel.includes(14)}
            update={this.update.bind(this)}
            index={14} />
          <Tile val={this.state.vals[15]}
            comp={this.state.comp.includes(15)}
            sel={this.state.sel.includes(15)}
            update={this.update.bind(this)}
            index={15} />
        </div>
      </div>
    );
  }
}

// all components apart from the main root should be functional
// pass only the state values that are relevant to this component
function Tile(props) {
  var clr;
  var disp;

  if (props.comp) {
    clr = "success";
    disp = "";
  } else if (props.sel) {
    clr = "primary";
    disp = props.val;
  } else {
    clr = "secondary";
    disp = "";
  }

  return (
    <div className="col-3">
      <Button color={clr} onClick={() => props.update(props.index)}>{disp}</Button>
    </div>
  );
}

// returns an array with pairs of A-H in radom order
function resetValues() {
  var letters = ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D',
  'E', 'E', 'F', 'F', 'G', 'G', 'H', 'H'];

  var index = -1;
  var values = [];

  while(letters.length > 0) {
    index = Math.floor(Math.random() * letters.length);
    values.push(letters[index]);
    letters.splice(index, 1);
  }

  return values;
}
