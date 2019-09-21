import React, { Component } from 'react';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';

 /*
  * This application illustrates the use of 
  * table with a custom component but more importantly
  * it has a very simple model with change notification
  * implemented.
  */

/**
  * Model for the app. Manages the data
  * (procedurally generates it). Posts
  * notification to registered listeners
  * when data changes.
  */
class AnglesModel {
	constructor() {
		this.alterationSpeed = 0.1;
		this.changeListeners = [];
	}
	
	setAlterationSpeed(spd) {
		this.alterationSpeed = spd;
		for (let i = 0; i < this.changeListeners.length; i++)
			this.changeListeners[i]();
	}
	
	addChangeListener(l) {
		this.changeListeners.push(l);
	}
	
	getSize() {
		return 100;
	}
	
	getValue(index) {
		return Math.sin(this.alterationSpeed*index) * 180 + 180;
	}
}

/**
  * Small custom component consisting of <canvas>
  * to display an angle but textually and visually.
  */
class AngleComponent extends Component {
	componentDidMount() {
		this.draw();
	}
	componentDidUpdate(prevProp, prevState) {
		this.draw();
	}
	
	draw = () => {
		const ctx = this.canvas.getContext("2d");
		const pieX = this.props.width - this.props.height/2;
		const pieY = this.props.height/2;
		const pieR = this.props.height/5*2;
		ctx.clearRect(0, 0, this.props.width, this.props.height);
		ctx.beginPath();
		ctx.moveTo(pieX, pieY);
		ctx.arc(pieX, pieY, pieR, 0, this.props.angle/180*Math.PI, true);
		ctx.lineTo(pieX, pieY);
		ctx.fillStyle = "#808080";
		ctx.fill();
		ctx.stroke();
		ctx.fillStyle = "black";
		ctx.font ="18pt sans-serif";
		ctx.fillText(this.props.angle.toFixed(2) + "deg", 0, this.height/5*4);
	}
	
	render() {
		return <canvas width={this.props.width} height={this.props.height} ref={(c) => {this.canvas = c;}} />
	}
}

/**
  * Main program is the view to the data and also 
  * encapsulates the Controller functionality.
  *
  * Model instance is created into the state and 
  * the App registers to listen to changes in the
  * model and updates when the model reports an
  * update.
  */
class App extends Component {
	constructor() {
		super();
		this.state ={
			model: new AnglesModel(),
			totalSelected: 0,
			selected: null,
		};
		this.state.model.addChangeListener(this.onChange);
	}
	
	onChange = () => {
		this.forceUpdate();
	}
	
	hover = (hoverRow) => {
		const sel = (hoverRow<0)?null:this.state.model.getValue(hoverRow);
		this.setState({
			selected: sel,
		});
	}
	
	updateSums = (selectedRows) => {
		let sum = 0;
		for (var i = 0; i < selectedRows.length; i++) {
			sum += this.state.model.getValue(selectedRows[i]);
		}
		this.setState({
			totalSelected: sum,
		});
	}
	
	render() {
		// Loop through the model contents and create rows.
		let tableRows = [];
		for (var i = 0; i < this.state.model.getSize(); i++) {
			tableRows.push(<TableRow key={i} >
					<TableRowColumn><AngleComponent width={200} height={50} index={i} angle={this.state.model.getValue(i)} /></TableRowColumn>
					<TableRowColumn>{(this.state.model.getValue(i)/180*Math.PI).toFixed(2)}</TableRowColumn>
				</TableRow>
				);
		}
		
		return (
			<MuiThemeProvider>
				<Paper style={{width:800, display: 'flex', flexDirection: 'row'}}>
					<div style={{width:600, height: 600}}>
						<Table
							fixedHeader={false}
							fixedFooter={false}
							selectable={true}
							multiSelectable={true}
							onRowSelection={this.updateSums}
							onRowHover={(rn) => {this.hover(rn);}}
							onRowHoverExit={(rn) => {this.hover(-1);}}
						>
							<TableHeader
								displaySelectAll={false}
								adjustForCheckbox={false}
							>
								<TableRow>
									<TableHeaderColumn tooltip="Angle in degrees">Angle</TableHeaderColumn>
									<TableHeaderColumn tooltip="Angle in Radians">Radians</TableHeaderColumn>
								</TableRow>
							</TableHeader>
							<TableBody
								displayRowCheckbox={false}
								deselectOnClickaway={true}
								showRowHover={true}
								stripedRows={true}
							>
								{tableRows}
							</TableBody>
						</Table>
					</div>
					<div>
						<div>
							Total selected angles: <br/> {this.state.totalSelected.toFixed(2)} degrees.
						</div>
						<div>
							In circles: <br/>{(this.state.totalSelected/360).toFixed(2)} full circles.
						</div>
						<div style={{width: 100, height:100}}>
							{(this.state.selected !== null)?<AngleComponent width={100} height={100} index={0} angle={this.state.selected} />:null}
						</div>
						<RaisedButton label="Fast Change" onClick={(e) => {this.state.model.setAlterationSpeed(0.9);}} />
						<RaisedButton label="Slow Change" onClick={(e) => {this.state.model.setAlterationSpeed(0.01);}} />
					</div>
				</Paper>
			</MuiThemeProvider>
		);
	}
}

export default App;
