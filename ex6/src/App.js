import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import './App.css';

class CityModel {
  constructor(props) {
    this.state = {
      cityArray: []
    }
  }

  pushCity(city) {
    this.state.cityArray.push(city)
    console.log(this.state.cityArray)
  }

  getCity(i) {
    return this.state.cityArray[i]
  }

  deleteCity(i) {
    this.state.cityArray.splice(i, 1)
    console.log(this.state.cityArray)
  }

  updateCity = (i, row) => {
    this.state.cityArray[i] = row
    console.log(this.state.cityArray)
  }

  getCities() {
    return this.state.cityArray
  }
}

class App extends Component {
  constructor(props) {
    super();
    this.state = {
      model: new CityModel(),
      modalOpen: false,
      name: "",
      country: "",
      established: 0,
      people: 0,
      chosen: false,
      updateOpen: false,
      chosenCity: 0
    };
  }

  createCity = () => {
    var city = {name: this.state.name, country: this.state.country, established: this.state.established, people: this.state.people}
    this.state.model.pushCity(city)
    this.setState({ modalOpen: false })
  }

  addNewCity = () => {
    this.setState({ modalOpen: true })
  }

  chooseCity = (f) => {
    var i = f-1;
    var city = this.state.model.getCity(i)
    console.log(city)
    this.setState({ chosenCity: i})
    this.setState({ chosen: true })
    this.setState({ name: city.name })
    this.setState({ country: city.country })
    this.setState({ established: city.established })
    this.setState({ people: city.people })
  }

  editCity = () => {
    this.setState({ updateOpen: true })
  }

  updateCity = () => {
    var updatedCity = {name: this.state.name, country: this.state.country, established: this.state.established, people: this.state.people}
    this.state.model.updateCity(this.state.chosenCity, updatedCity)
    this.setState({ updateOpen: false })
  }

  removeCity = (f) => {
    this.state.model.deleteCity(f)
  }

  closeModal = () => {
    this.setState({ modalOpen: false })
    this.setState({ updateOpen: false })
  }

  updateName = (event) => {
    this.setState({ name: event.target.value})
  }

  updateCountry = (event) => {
    this.setState({ country: event.target.value})
  }

  updateEst = (event) => {
    this.setState({ established: event.target.value})
  }

  updatePeople = (event) => {
    this.setState({people: event.target.value})
  }

  printCities = () => {
    var tableArr = []
    var cityArr = this.state.model.getCities()
    for (var i = 0; i < cityArr.length; i++) {
      tableArr.push(<TableRow onClick={() => this.chooseCity(i)} key={i}><TableCell>{ cityArr[i].name }</TableCell></TableRow>)
    }
    return tableArr
  }

  render() {
    const { modalOpen, updateOpen, chosen } = this.state;
    return(
      <div>
      <Paper>
        <Button onClick={this.addNewCity}>Add</Button>
        <Button onClick={this.editCity} disabled={!chosen}>Edit</Button>
        <Button onClick={this.removeCity} disabled={!chosen}>Remove</Button>
        <Table className="tabb">
        <TableHead>
          <TableRow>
            <TableCell>City</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {this.printCities()}
        </TableBody>
      </Table>
      </Paper>
      <Dialog open={modalOpen} onClose={this.closeModal} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Create new city!</DialogTitle>
        <DialogContent>
          <TextField autoFocus margin="dense" id="name" label="City name" type="email" onChange={this.updateName} value={this.state.name} fullWidth />
          <TextField autoFocus margin="dense" id="name" label="City country" type="email" onChange={this.updateCountry} value={this.state.country} fullWidth />
          <TextField autoFocus margin="dense" id="name" label="City established" type="email" onChange={this.updateEst} value={this.state.established} fullWidth />
          <TextField margin="dense" id="name" label="City population" type="email" onChange={this.updatePeople} value={this.state.people} fullWidth />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.closeModal} color="primary">Cancel</Button>
          <Button onClick={this.createCity} color="primary">Generate!</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={updateOpen} onClose={this.closeModal} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Update the city!</DialogTitle>
        <DialogContent>
          <TextField autoFocus margin="dense" id="name" label="City name" type="email" onChange={this.updateName} value={this.state.name} fullWidth />
          <TextField autoFocus margin="dense" id="name" label="City country" type="email" onChange={this.updateCountry} value={this.state.country} fullWidth />
          <TextField autoFocus margin="dense" id="name" label="City established" type="email" onChange={this.updateEst} value={this.state.established} fullWidth />
          <TextField margin="dense" id="name" label="City population" type="email" onChange={this.updatePeople} value={this.state.people} fullWidth />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.closeModal} color="primary">Cancel</Button>
          <Button onClick={this.updateCity} color="primary">Update!</Button>
        </DialogActions>
      </Dialog>
      </div>
    );
  }
}
export default App;
