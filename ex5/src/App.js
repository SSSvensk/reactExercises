import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import './App.css';
import Paper from '@material-ui/core/Paper';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/lab/Slider';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const styles = {
  root: {
    width: 700,
    padding: 10
  },
  slider: {
    padding: '22px 0px',
  },
};

class App extends Component {

  constructor(props) {
    super();
    this.state = {
      anchorEl: null,
      circle: null,
      circles: [
        {index: 0, circleX: 100, circleY: 175, name: '', color: {red: 23, green: 177, blue: 34, alpha: 0.45}},
        {index: 1, circleX: 135, circleY: 100, name: '', color: {red: 222, green: 123, blue: 56, alpha: 0.45}},
        {index: 2, circleX: 170, circleY: 175, name: '', color: {red: 34, green: 67, blue: 98, alpha: 0.45}}
      ],
      curRed: 0,
      curBlue: 0,
      curGreen: 0,
      chosenCircle: 0,
      menuOpen: false,
      changingColor: false,
      animating: false,
      changingName: false,
      curName: ''
    };
  }

  handleResize(){
    this.setState({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }

  isIntersect(point, circle) {
    return Math.sqrt((point.x-circle.circleX) ** 2 + (point.y - circle.circleY) ** 2) < 50;
  }

  handleClose = () => {
    this.setState({ anchorEl: null });
  }

  animate = () => {
    if (this.state.animating) {
      // The update call updates the state and therefore 
      // causes componentDidUpdate call, which redraws the graphics.
      this.update((new Date().getTime()%2000)/2000);
      console.log("animating");
    }
    this.animationRequest = requestAnimationFrame(this.animate);
  }

  componentDidMount() {
    this.redrawCanvas();
    const canvas = this.refs.canvas
    canvas.addEventListener('click', (e) => {
      if (this.state.menuOpen) {
        this.setState({ anchorEl: null });
      } else {
        this.setState({ anchorEl: e.currentTarget });
      }
      const pos = {
        x: e.clientX,
        y: e.clientY
      };
      var circles = 0;
      var clickcircle = null;
      this.state.circles.forEach(circle => {

        if (this.isIntersect(pos, circle)) {
          circles += 1;
          clickcircle = circle;
          this.setState({ curName: this.state.curName + "" + circle.name});
        }
      })
      if (circles == 1) {
        this.setState({ circle: clickcircle });
        this.setState({ curRed: clickcircle.color.red });
        this.setState({ curGreen: clickcircle.color.green });
        this.setState({ curBlue: clickcircle.color.blue });
        this.setState({ curName: clickcircle.name });
        this.setState({ selected: true });
      } else if (circles > 1) {
        this.setState({ selected: false });
        alert(this.state.curName);
        this.setState({curName: ''})
      }
    })
    window.addEventListener('resize', () => {this.handleResize()});
    // initialize some of the state values
    // start animation loop
    this.animationRequest = requestAnimationFrame(this.animate);
  }

  componentDidUpdate() {
    this.redrawCanvas();
  }

  changeColor = () => {
    this.setState({ changingColor: true });
    this.handleClose();
  }
  changeName = () => {
    this.setState({ changingName: true });
    this.handleClose();
  }

  handleRedChange = (event, curRed) => {
    this.setState({ curRed });
    var newcircle = {index: this.state.circle.index, circleX: this.state.circle.circleX, circleY: this.state.circle.circleY, name: this.state.circle.name, color: {red: curRed, green: this.state.circle.color.green, blue: this.state.circle.color.blue, alpha: 0.45}}
    this.setState({ circle: newcircle });

    var tmplist = this.state.circles;
    tmplist[this.state.circle.index] = newcircle;
    this.setState({ circles: tmplist });
  }

  handleGreenChange = (event, curGreen) => {
    this.setState({ curGreen });
    var newcircle = {index: this.state.circle.index, circleX: this.state.circle.circleX, circleY: this.state.circle.circleY, name: this.state.circle.name, color: {red: this.state.circle.color.red, green: curGreen, blue: this.state.circle.color.blue, alpha: 0.45}}
    this.setState({ circle: newcircle });

    var tmplist = this.state.circles;
    tmplist[this.state.circle.index] = newcircle;
    this.setState({ circles: tmplist });
  }

  handleBlueChange = (event, curBlue) => {
    this.setState({ curBlue });
    var newcircle = {index: this.state.circle.index, circleX: this.state.circle.circleX, circleY: this.state.circle.circleY, name: this.state.circle.name, color: {red: this.state.circle.color.red, green: this.state.circle.color.green, blue: curBlue, alpha: 0.45}}
    this.setState({ circle: newcircle });

    var tmplist = this.state.circles;
    tmplist[this.state.circle.index] = newcircle;
    this.setState({ circles: tmplist });
  }

  closeColor = () => {
    this.setState({ changingColor: false });
  }

  updateName = (event, curName) => {
    console.log(event.target.value);
    this.setState({curName: event.target.value});
    var newcircle = {index: this.state.circle.index, circleX: this.state.circle.circleX, circleY: this.state.circle.circleY, name: event.target.value, color: {red: this.state.circle.color.red, green: this.state.circle.color.green, blue: this.state.circle.color.blue, alpha: 0.45}}
    this.setState({ circle: newcircle });
    console.log(newcircle)
    var tmplist = this.state.circles;
    tmplist[this.state.circle.index] = newcircle;
    this.setState({ circles: tmplist });
  }

  redrawCanvas() {
    const canvas = this.refs.canvas
    
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, 640, 225);
    for (var i = 0; i < this.state.circles.length; i++) {
      ctx.fillStyle = "rgba("+this.state.circles[i].color.red+","+this.state.circles[i].color.green+","+this.state.circles[i].color.blue+","+this.state.circles[i].color.alpha+")";
      ctx.opacity = 0.4;
      ctx.beginPath();
      var box = ctx.arc(this.state.circles[i].circleX, this.state.circles[i].circleY, 50, 0, 2 * Math.PI);
      ctx.stroke();
      ctx.closePath();
      ctx.fill();
    };
    console.log("animating");
  }

  render() {
    const { anchorEl, circle, curRed, curBlue, curGreen, changingColor, changingName, curName } = this.state;
    const { classes } = this.props;
    return(
      <div className={ classes.root }>
        <Paper>
           <canvas ref="canvas" width={640} height={225} />

           { changingColor ? <Grid item xs={6}>
           <Button onClick={this.closeColor}>Close</Button>
            <Typography id="label">Red value</Typography>
            <Slider
              classes={{ container: classes.slider }}
              min={0}
              max={255}
              step={1}
              value={ curRed }
              aria-labelledby="label"
              onChange={this.handleRedChange}
            />
            <Typography id="label">Blue value</Typography>
            <Slider
              classes={{ container: classes.slider }}
              min={0}
              max={255}
              step={1}
              value={ curBlue }
              aria-labelledby="label"
              onChange={this.handleBlueChange}
            />
            <Typography id="label">Green value</Typography>
            <Slider
              classes={{ container: classes.slider }}
              min={0}
              max={255}
              step={1}
              value={ curGreen }
              aria-labelledby="label"
              onChange={this.handleGreenChange}
            />
          </Grid> : "" }
          { changingName ? <TextField margin="dense" id="name" label="Circle name" type="email" onChange={this.updateName} value={curName} fullWidth /> : ''} 
        </Paper>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          <MenuItem>Name</MenuItem>
          <MenuItem onClick={this.changeColor}>Change color</MenuItem>
          <MenuItem onClick={this.changeName}>Change name</MenuItem>
        </Menu>
      </div>
    )
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);
