import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/lab/Slider';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

const styles = {
  root: {
    width: 700,
    padding: 10
  },
  slider: {
    padding: '22px 0px',
  },
};

class SimpleSlider extends React.Component {
  state = {
    redvalue: 0,
    prevred: 0,
    greenvalue: 0,
    prevgreen: 0,
    bluevalue: 0,
    prevblue: 0,
    totalcolor: "rgb(0,0,0)",
    colorlist: [],
    history: [],
    redo: [],
    listOfColors: []
  };

  handleRedChange = (event, redvalue) => {
    this.setState({ redvalue });
    this.setState({totalcolor: "rgb(" + this.state.redvalue + "," + this.state.greenvalue + "," + this.state.bluevalue + ")"});
    this.setState({ redo: [] });
  };

  handleBlueChange = (event, bluevalue) => {
    this.setState({ bluevalue });
    this.setState({totalcolor: "rgb(" + this.state.redvalue + "," + this.state.greenvalue + "," + this.state.bluevalue + ")"});
    this.setState({ redo: [] });
  };

  handleGreenChange = (event, greenvalue) => {
    this.setState({ greenvalue });
    this.setState({totalcolor: "rgb(" + this.state.redvalue + "," + this.state.greenvalue + "," + this.state.bluevalue + ")"});
    this.setState({ redo: [] });
  };

  storeOldRed = (event) => {
    console.log(this.state.redvalue);
    this.setState({ prevred: this.state.redvalue });
    var action = {color: "red", oldvalue: this.state.redvalue};
    this.state.history.push(action);
    console.log(this.state.history);
  };

  storeOldGreen = (event) => {
    console.log(this.state.greenvalue);
    this.setState({ prevgreen: this.state.greenvalue });
    var action = {color: "green", oldvalue: this.state.greenvalue};
    this.state.history.push(action);
    console.log(this.state.history);
    
  };

  makeUndo = (event) => {
    console.log(this.state.history[this.state.history.length - 1]);

    this.state.redo.push(this.state.totalcolor);
    console.log(this.state.redo);
    if (this.state.history[this.state.history.length - 1].color == "red") {
      this.setState({ redvalue: this.state.history[this.state.history.length - 1].oldvalue });
      this.state.redo.push({color: this.state.history[this.state.history.length - 1].color, oldvalue: this.state.redvalue});
      this.setState({totalcolor: "rgb(" + this.state.history[this.state.history.length - 1].oldvalue + "," + this.state.greenvalue + "," + this.state.bluevalue + ")"});
    } else if (this.state.history[this.state.history.length - 1].color == "green") {
      this.setState({ greenvalue: this.state.history[this.state.history.length - 1].oldvalue });
      this.state.redo.push({color: this.state.history[this.state.history.length - 1].color, oldvalue: this.state.greenvalue});
      this.setState({totalcolor: "rgb(" + this.state.redvalue + "," + this.state.history[this.state.history.length - 1].oldvalue + "," + this.state.bluevalue + ")"});
    } else if (this.state.history[this.state.history.length - 1].color == "blue") {
      this.setState({ bluevalue: this.state.history[this.state.history.length - 1].oldvalue });
      this.state.redo.push({color: this.state.history[this.state.history.length - 1].color, oldvalue: this.state.bluevalue});
      this.setState({totalcolor: "rgb(" + this.state.redvalue + "," + this.state.greenvalue + "," + this.state.history[this.state.history.length - 1].oldvalue + ")"});
    }

    var tmp = this.state.history;
    var removed = tmp.pop();
    
    
    this.setState({ history: tmp });
    
  };

  makeRedo = (event) => {
    console.log(this.state.redo);
    if (this.state.redo[this.state.redo.length - 1].color == "red") {
      this.setState({ redvalue: this.state.redo[this.state.redo.length - 1].oldvalue });
      this.state.history.push({color: this.state.redo[this.state.redo.length - 1].color, oldvalue: this.state.redvalue});
      this.setState({totalcolor: "rgb(" + this.state.redo[this.state.redo.length - 1].oldvalue + "," + this.state.greenvalue + "," + this.state.bluevalue + ")"});
    } else if (this.state.redo[this.state.redo.length - 1].color == "green") {
      this.setState({ greenvalue: this.state.redo[this.state.redo.length - 1].oldvalue });
      this.state.history.push({color: this.state.redo[this.state.redo.length - 1].color, oldvalue: this.state.greenvalue});
      this.setState({totalcolor: "rgb(" + this.state.redvalue + "," + this.state.redo[this.state.redo.length - 1].oldvalue + "," + this.state.bluevalue + ")"});
    } else if (this.state.redo[this.state.redo.length - 1].color == "blue") {
      this.setState({ bluevalue: this.state.redo[this.state.redo.length - 1].oldvalue });
      this.state.history.push({color: this.state.redo[this.state.redo.length - 1].color, oldvalue: this.state.bluevalue});
      this.setState({totalcolor: "rgb(" + this.state.redvalue + "," + this.state.greenvalue + "," + this.state.redo[this.state.redo.length - 1].oldvalue + ")"});
    }

    var tmp = this.state.redo;
    var removed = tmp.pop();
    
    
    this.setState({ redo: tmp });
  }

  storeOldBlue = (event) => {
    console.log(this.state.bluevalue);
    this.setState({ prevblue: this.state.bluevalue });
    var action = {color: "blue", oldvalue: this.state.bluevalue};
    this.state.history.push(action);
    console.log(this.state.history);
    
  }

  saveColor = (event) => {
    this.state.colorlist.push(this.state.totalcolor);
    console.log(this.state.colorlist);
    this.setState({ bluevalue: 0 });
    this.setState({ redvalue: 0 });
    this.setState({ greenvalue: 0 });
    this.setState({ history: [] });
    this.state.history.push({color: "add"})
    this.setState({ totalcolor: "rgb(0,0,0)" });
  }

  printColorList = (event) => {
    var selectarr = [];
    for (var i = 0; i < this.state.colorlist.length; i++) {
      selectarr.push(<option key={i} value={this.state.colorlist[i]} onClick={this.getColor}>{this.state.colorlist[i]}</option>)
    };

    console.log(selectarr);
    return selectarr;
  }

  getColor = (event) => {
    var color = event.target.value;
    this.setState({ totalcolor: event.target.value});
    var n = color.split("(");
    var m = n[1].split(")");
    var c = m[0].split(",");
    console.log(c);

    this.setState({ redvalue: parseInt(c[0])});
    this.setState({ greenvalue: parseInt(c[1])});
    this.setState({ bluevalue: parseInt(c[2])});

  }

  render() {
    const { classes } = this.props;
    const { redvalue, bluevalue, greenvalue, totalcolor, colorlist } = this.state;

    return (
      <div className={classes.root}>
        <div>
          <Button onClick={this.makeUndo} disabled={this.state.history.length === 0}>Undo</Button>
          <Button onClick={this.makeRedo} disabled={this.state.redo.length === 0}>Redo</Button>
        </div>
        
        <Grid container spacing={24}>
          <Grid item xs={6}>
            <Typography id="label">Red value</Typography>
            <Slider
              classes={{ container: classes.slider }}
              min={0}
              max={255}
              step={1}
              value={redvalue}
              aria-labelledby="label"
              onChange={this.handleRedChange}
              onDragStart={this.storeOldRed}
            />
            <Typography id="label">Blue value</Typography>
            <Slider
              classes={{ container: classes.slider }}
              min={0}
              max={255}
              step={1}
              value={bluevalue}
              aria-labelledby="label"
              onChange={this.handleBlueChange}
              onDragStart={this.storeOldBlue}
            />
            <Typography id="label">Green value</Typography>
            <Slider
              classes={{ container: classes.slider }}
              min={0}
              max={255}
              step={1}
              value={greenvalue}
              aria-labelledby="label"
              onChange={this.handleGreenChange}
              onDragStart={this.storeOldGreen}
            />
          </Grid>
          <Grid item xs={6}>
            <select className="select-board-size">
              {this.printColorList()}
            </select>
          </Grid>
          <Grid style={{backgroundColor: totalcolor}} item xs={6}>{totalcolor}</Grid>
        </Grid>
        <Grid container spacing={24}>
          <Grid><Button onClick={this.saveColor}>
            Add to the list
          </Button></Grid>
        </Grid>
      </div>
    );
  }
}

SimpleSlider.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleSlider);
