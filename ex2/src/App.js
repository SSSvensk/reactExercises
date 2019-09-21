import React, { Component } from 'react';
import './App.css';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Population from './Population';

class App extends Component {

  constructor(props) {
    super();
    this.state = {
      anchorEl: null,
      modalOpen: false,
      country: "",
      people: 1,
      listOfPeople: [],
      generated: false,
      pop: null,
      currentIndex: 0,
      analysisOpen: false,
      firstnameStat: {},
      lastnameStat: {},
      birthPlaceStat: {},
      birthyearStat: {}
    };
  }

  openMenu = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  updateCountry = (event) => {
    this.setState({country: event.target.value});
  }

  updatePeople = (event) => {
    this.setState({people: event.target.value});
  }

  closeMenu = (event) => {
    this.setState({ anchorEl: null });
  };

  openPeopleModal = (event) => {
    this.closeMenu();
    this.setState({ modalOpen: true });
  }

  closeModal = (event) => {
    this.setState({ modalOpen: false });
    this.setState({ analysisOpen: false });
  }

  generatePeople = (event) => {
    this.closeModal();
    var p = new Population(this.state.country);
    this.setState({ pop: p });
    console.log(this.state.country);
    console.log(this.state.people);
    for (var i = 0; i < this.state.people; i++) {
      this.state.listOfPeople.push(p.nextPerson());
    };
    console.log(this.state.listOfPeople);
    this.setState({ generated: true });
  }

  showNext = (event) => {
    this.closeMenu();
    if (this.state.currentIndex == this.state.listOfPeople.length - 1) {
      this.setState({currentIndex: 0})
    } else {
      this.setState({currentIndex: this.state.currentIndex + 1});
    }
  }

  showPrevious = (event) => {
    this.closeMenu();
    if (this.state.currentIndex == 0) {
      this.setState({currentIndex: this.state.listOfPeople.length - 1});
    } else {
      this.setState({currentIndex: this.state.currentIndex - 1});
    }
    console.log(this.state.currentIndex);
  }

  updateFirstName = (event) => {
    var copyList = this.state.listOfPeople;
    copyList[this.state.currentIndex]["name"]["first"] = event.target.value;
    this.setState({ listOfPeople: copyList});
  }

  updateLastName = (event) => {
    var copyList = this.state.listOfPeople;
    copyList[this.state.currentIndex]["name"]["last"] = event.target.value;
    this.setState({ listOfPeople: copyList});
  }

  updateBirthPlace = (event) => {
    var copyList = this.state.listOfPeople;
    copyList[this.state.currentIndex]["birthPlace"]["town"] = event.target.value;
    this.setState({ listOfPeople: copyList});
  }

  countMode(list) {
    var uniques = Array.from(new Set(list));
    var mostOccur = "";
    var highestOccur = 0;
    for (var i = 0; i < uniques.length; i++) {
      var occurs = 0;
      for (var j = 0; j < list.length; j++) {
        if (list[j] == uniques[i]) {
          occurs++;
        }
      };
      if (occurs > highestOccur) {
        mostOccur = uniques[i];
        highestOccur = occurs;
      };
    };
    var modeAndUniques = {};
    modeAndUniques["unique"] = uniques.length;
    modeAndUniques["mode"] = mostOccur;
    modeAndUniques["modeValue"] = highestOccur;
    return modeAndUniques;

  }

  handleNumericArray(list) {

    var years = [];
    var yearsum = 0;

    console.log(list);

    for (var i = 0; i < list.length; i++) {
      var str = list[i] + '';
      var splitted = str.split(" ");
      yearsum = yearsum + parseInt(splitted[3]);
      years.push(parseInt(splitted[3]));
    };

    var yearStats = this.countMode(years);

    console.log(years);

    yearStats["avg"] = yearsum / years.length;

    years.sort();

    if (years.length % 2 == 0) {
      yearStats["median"] = (years[years.length/2] + years[years.length/2 - 1]) / 2;
    } else {
      yearStats["median"] = years[Math.floor(years.length/2)];
    }

    console.log(yearStats);

    this.setState({ birthyearStat: yearStats });

  }

  openAnalysis = (event) => {
    this.closeMenu();

    var firstnamelist = [];
    var lastnamelist = [];
    var birthplacelist = [];
    var birthyearlist = [];

    for (var i = 0; i < this.state.listOfPeople.length; i++) {
      lastnamelist.push(this.state.listOfPeople[i]["name"]["last"]);
      firstnamelist.push(this.state.listOfPeople[i]["name"]["first"]);
      birthplacelist.push(this.state.listOfPeople[i]["birthPlace"]["town"]);
      birthyearlist.push(this.state.listOfPeople[i]["birthDate"]);
    };

    this.setState({ firstnameStat: this.countMode(firstnamelist) });
    this.setState({ lastnameStat: this.countMode(lastnamelist) });
    this.setState({ birthPlaceStat: this.countMode(birthplacelist) });

    this.handleNumericArray(birthyearlist);


    this.setState({ analysisOpen: true });
  }

  render() {
    const { anchorEl, modalOpen, listOfPeople, generated, currentIndex, firstnameStat, lastnameStat, birthPlaceStat, birthyearStat } = this.state;
    return (
      <MuiThemeProvider>
        <Paper className="paper">
          <Button aria-owns={anchorEl ? 'simple-menu' : undefined} aria-haspopup="true" onClick={this.openMenu}>
            Open Menu
          </Button>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={this.handleClose}
          >
            <MenuItem onClick={this.openPeopleModal}>Generate</MenuItem>
            <MenuItem onClick={this.showNext} disabled={!generated}>Next person</MenuItem>
            <MenuItem onClick={this.showPrevious} disabled={!generated}>Previous person</MenuItem>
            <MenuItem onClick={this.openAnalysis} disabled={!generated}>Analysis</MenuItem>
          </Menu>
          {this.state.generated ?
            <div>
              <TextField autoFocus margin="dense" id="name" label="First name" type="email" onChange={this.updateFirstName} value={this.state.listOfPeople[currentIndex]["name"]["first"]} fullWidth />
              <TextField margin="dense" id="name" label="Last name" type="email" onChange={this.updateLastName} value={this.state.listOfPeople[currentIndex]["name"]["last"]} fullWidth />
              <TextField margin="dense" id="name" label="Birth place" type="email" onChange={this.updateBirthPlace} value={this.state.listOfPeople[currentIndex]["birthPlace"]["town"]} fullWidth />
            </div>
           : ""}
        </Paper>

        <Dialog open={this.state.modalOpen} onClose={this.closePeopleModal} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Generate</DialogTitle>
          <DialogContent>
            <DialogContentText>Create people for your country!</DialogContentText>
            <TextField autoFocus margin="dense" id="name" label="Country name" type="email" onChange={this.updateCountry} value={this.state.country} fullWidth />
            <TextField margin="dense" id="name" label="Amount of people" type="email" onChange={this.updatePeople} value={this.state.people} fullWidth />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.closeModal} color="primary">Cancel</Button>
            <Button onClick={this.generatePeople} color="primary">Generate!</Button>
          </DialogActions>
        </Dialog>

        <Dialog open={this.state.analysisOpen} onClose={this.closeModal} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Analysis</DialogTitle>
          <DialogContent>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Item</TableCell>
                  <TableCell align="right">Mode</TableCell>
                  <TableCell align="right">Mode value</TableCell>
                  <TableCell align="right">Uniques</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>Last name</TableCell>
                  <TableCell align="right">{lastnameStat["mode"]}</TableCell>
                  <TableCell align="right">{lastnameStat["modeValue"]}</TableCell>
                  <TableCell align="right">{lastnameStat["unique"]}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>First name name</TableCell>
                  <TableCell align="right">{firstnameStat["mode"]}</TableCell>
                  <TableCell align="right">{firstnameStat["modeValue"]}</TableCell>
                  <TableCell align="right">{firstnameStat["unique"]}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Birth place</TableCell>
                  <TableCell align="right">{birthPlaceStat["mode"]}</TableCell>
                  <TableCell align="right">{birthPlaceStat["modeValue"]}</TableCell>
                  <TableCell align="right">{birthPlaceStat["unique"]}</TableCell>
                </TableRow>
              </TableBody>
            </Table>

            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Item</TableCell>
                  <TableCell align="right">Mode</TableCell>
                  <TableCell align="right">Mode value</TableCell>
                  <TableCell align="right">Uniques</TableCell>
                  <TableCell align="right">Average</TableCell>
                  <TableCell align="right">Median</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>Birth year</TableCell>
                  <TableCell align="right">{birthyearStat["mode"]}</TableCell>
                  <TableCell align="right">{birthyearStat["modeValue"]}</TableCell>
                  <TableCell align="right">{birthyearStat["unique"]}</TableCell>
                  <TableCell align="right">{birthyearStat["avg"]}</TableCell>
                  <TableCell align="right">{birthyearStat["median"]}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.closeModal} color="primary">Close</Button>
          </DialogActions>
        </Dialog>

      </MuiThemeProvider>
    );
  }
}

export default App;
