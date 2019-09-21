import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Snackbar from '@material-ui/core/Snackbar';
import BUNDLE from './i18n_bundle'

class App extends Component {
  constructor(props) {
    super();
    this.state = {
      eventId: 0,
      eventName: "",
      language: "",
      eventDate: "2019-05-01",
      eventTime: "07:30",
      eventAlarm: "",
      curTime: "k",
      alarmOpen: false,
      alarmEvent: {}
    }
  }

  componentDidMount() {
    setInterval( () => {
      this.setState({
        curTime : new Date().toLocaleString()
      })
      var spl = this.state.curTime.split(",")
      var ss = spl[0].split("/")
      console.log(ss)
      var sk = spl[1].split(":")
      console.log(sk)
      for (var i = 0; i < this.state.eventId; i++) {
        var eventItem = JSON.parse(localStorage.getItem(i))
        var dateSpl = eventItem.date.split("-")
        var timeSpl = eventItem.alarm.split(":")
        console.log(dateSpl)
        console.log(timeSpl)
        if (parseInt(ss[0]) == parseInt(dateSpl[1]) && parseInt(ss[1]) == parseInt(dateSpl[2]) && parseInt(ss[2]) == parseInt(dateSpl[0]) && parseInt(sk[0]) == parseInt(timeSpl[0]) && parseInt(sk[1]) == parseInt(timeSpl[1])) {
          this.setState({ alarmOpen: true })
          this.setState({ alarmEvent: eventItem })
        }
      }
    },1000)
  }

  updateName = (event) => {
    this.setState({ eventName: event.target.value})
  }

  updateLanguage = (event) => {
    this.setState({ language: event.target.value})
    console.log("aaa")
  }

  updateDate = (event) => {
    this.setState({ eventDate: event.target.value})
  }

  updateTime = (event) => {
    this.setState({ eventTime: event.target.value})
  }

  updateAlarm = (event) => {
    this.setState({ eventAlarm: event.target.value})
  }

  submitEvent = () => {
    var spl = this.state.eventTime.split(":")
    var alarmMinutes = parseInt(spl[1]) - this.state.eventAlarm
    var alarmHours = parseInt(spl[0])
    if (alarmMinutes < 0) {
      alarmMinutes = parseInt(spl[1]) + (60-this.state.eventAlarm)
      alarmHours = alarmHours - 1
    };
    var timeString = alarmHours.toString() + ":" + alarmMinutes.toString()
    var readyEvent = { name: this.state.eventName, language: this.state.language, date: this.state.eventDate, time: this.state.eventTime, alarm: timeString}
    console.log(readyEvent)
    localStorage.setItem(this.state.eventId, JSON.stringify(readyEvent));
    this.setState({eventId: this.state.eventId + 1})
  }

  printEvents() {
    let bundle = BUNDLE.default;
    var tmp = []
    for (var i = 0; i < this.state.eventId; i++) {
      var getEvent = JSON.parse(localStorage.getItem(i))
      if (getEvent.language in BUNDLE) {
        bundle = BUNDLE[getEvent.language];
      }
      tmp.push(<TableRow key={i}><TableCell>{bundle.nameDescription} {getEvent.name} {bundle.dateDescription} {getEvent.date} {getEvent.time}</TableCell></TableRow>)
    }
    return tmp
  }

  render() {
    // Choose the correct bundle to localize UI texts.
    return (
    <div className="App">
      <Paper>
        <TextField autoFocus margin="dense" id="name" onChange={this.updateName} value={this.state.eventName} label="Event name" type="name" />
        <Select onChange={this.updateLanguage} value={this.state.language}>
          <MenuItem value={"fi"}>FI</MenuItem>
          <MenuItem value={"en"}>EN</MenuItem>
          <MenuItem value={"de"}>DE</MenuItem>
        </Select>
        <TextField id="date" label="Event date" type="date" onChange={this.updateDate} defaultValue="2019-05-01" InputLabelProps={{ shrink: true}}></TextField>
        <TextField id="time" label="Event time" type="time" onChange={this.updateTime} defaultValue="07:30" InputLabelProps={{ shrink: true }} inputProps={{ step: 300 }}></TextField>
        <Select onChange={this.updateAlarm} value={this.state.eventAlarm}>
          <MenuItem value={0}>At the time of the event</MenuItem>
          <MenuItem value={5}>5 minutes before the event</MenuItem>
          <MenuItem value={15}>15 minutes before the event</MenuItem>
        </Select>
        <Button onClick={this.submitEvent}>Create event</Button>
        
      </Paper>
      <Paper>
      <Table className="tabb">
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {this.printEvents()}
        </TableBody>
      </Table>
      </Paper>
      <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={this.state.alarmOpen}
          autoHideDuration={6000}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">Event starting</span>}
          />
    </div>
  );
  }
}

export default App;
