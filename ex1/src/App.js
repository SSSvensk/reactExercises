import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper'
import Checkbox from '@material-ui/core/Checkbox';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import './App.css';

class App extends Component {

  constructor(props) {
    super();
    this.state = {
      mouseDown: false,
      mouseMove: false,
      mouseScroll: false,
      x: 0,
      y: 0,
      clickX: 0,
      clickY: 0,
      scrollX: 0,
      scrollY: 0,
      isHidden: false,
      isClosed: false,
      display: "visible",
      hide: false,
      maximumsize: false,
    };
    this._onMouseMove.bind(this)
  }

  registerMove = (event) => {
    this.setState(state => ({
      mouseMove: !state.mouseMove,
    }));
  }

  _onMouseMove = (event) => {
    event.persist();
    this.setState(state => ({
      x: event.clientX,
      y: event.clientY,
    }))
  }

  registerDown = (event) => {
    this.setState(state => ({
      mouseDown: !state.mouseDown,
    }));
  }

  _onMouseDown = (event) => {
    event.persist();
    this.setState(state => ({
      clickX: event.clientX,
      clickY: event.clientY,
    }));
  }

  registerWheel = (event) => {
    this.setState(state => ({
      mouseScroll: !state.mouseScroll
    }));
  }

  _onMouseWheel = (event) => {
    event.persist();
    console.log(event);
    this.setState(state => ({
      scrollX: event.clientX,
      scrollY: event.clientY,
    }));
  }

  closeApp = (event) => {
    this.setState(state => ({
      display: "none",
    }));
  }


  render() {
    const x = this.state.x;
    const y = this.state.y;

    const clickX = this.state.clickX;
    const clickY = this.state.clickY;

    const scrollX = this.state.scrollX;
    const scrollY = this.state.scrollY;

    const display = this.state.display;
    console.log(display);

    return (
      <MuiThemeProvider>
        <Paper style={{width: 600, display: {display}}} className="paper" onMouseMove={this._onMouseMove} onClick={this._onMouseDown} onWheel={this._onMouseWheel}>
          <FormControl component="fieldset">
          <FormLabel component="legend">Exercise 1.4<Button>minimize</Button><Button>maximize</Button><Button onClick={this.closeApp}>close</Button></FormLabel>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox value="gilad" onChange={this.registerDown} />
              }
              label="Mouse Listener"
            />
            <FormControlLabel
              control={
                <Checkbox value="jason" onChange={this.registerMove} />
              }
              label="Mouse motion Listener"
            />
            <FormControlLabel
              control={
                <Checkbox
                  value="antoine" onChange={this.registerWheel}
                />
              }
              label="Mouse wheel listener"
            />
          </FormGroup>
        </FormControl>
        {this.state.mouseDown ? <div>Mouse clicked position x={clickX}, y={clickY}</div> : ''}
        {this.state.mouseMove ? <div>Mouse moving in position x={x}, y={y}</div> : ''}
        {this.state.mouseScroll ? <div>Mouse wheel scrolled in poisition x={scrollX}, y={scrollY}</div> : ''}
        </Paper>
      </MuiThemeProvider>
    );
  }
}

export default App;
