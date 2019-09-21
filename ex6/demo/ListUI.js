import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';
import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';
import SearchIcon from 'material-ui/svg-icons/action/search';
import Subheader from 'material-ui/Subheader';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Toggle from 'material-ui/Toggle';

 /*
  * This example show usage of List as a hierarchy browser.
  * It shows information about some JavaScript objects as they
  * are in the browser where the app is executed in.
  * 
  * Avatar component is used as part of List.
  * It also uses Toggle and SelectField.
  */
  
 /**
   * Class displaying a hierarchical list of object
   * properties.
   */
class Reflector extends Component {
	/**
	  * Does a Google search in the browser, moves the page to results.
	  */
	doSearch = (searchString) => {
		let url = "http://www.google.com/search?q=" + searchString;
		window.location.assign(url);
	}

	/**
	  * Build a ListItem out of the given object.
	  * Calls buildNested for child properties and 
	  * if it returns a list, it will be nestedItems 
	  * of the item. ListItem has an avatar indicating
	  * its type (object, function, other) and secondary
	  * text describing it. 
	  */
	buildListItem = (parents, name, obj, level) => {
		let items = [];
		for (let i in obj) {
			if (obj.hasOwnProperty(i))
				items.push({name: i, obj: obj[i]});
		}
		const nested = this.buildNested(parents + "." + name, items, level);
		const type = typeof obj;
		let secondaryText = type;
		if (type === "function") {
			const fstr = obj.toString();
			secondaryText = fstr.substring(0, fstr.indexOf("{"));
		} else if (type === "string" || type === "number") {
			secondaryText += ":" + obj;
		}
		const typeChar = type==="function"?"f":type==="object"?"o":"v";
		const typeCol = type==="function"?"#ff8080":type==="object"?"#8080ff":"#80ff80";
		let avatar = <Avatar size={30} backgroundColor={typeCol}>{typeChar}</Avatar>
		if (nested == null || nested.length === 0) {
			const rightIcon = <IconButton onClick={(event) => {this.doSearch(parents + "." + name);}} ><SearchIcon/></IconButton>;
			return <ListItem key={parents+"."+name} hoverColor={typeCol} leftAvatar={avatar} secondaryText={secondaryText} rightIcon={rightIcon} >{name}</ListItem>;
		} else {
			return <ListItem key={parents+"."+name} hoverColor={typeCol} nestedItems={nested} leftAvatar={avatar} secondaryText={secondaryText} >{name}</ListItem>;
		}
	}
	
	/**
	  * Builds a list of ListItems from the given items. 
	  * The return value is an array of ListItems. The list
	  * also contains SubHeaders before each main type (function,
	  * object, other) and a Divider in the end if content was
	  * created.
	  * An empty list is returned if level parameter is >= 2 or
	  * an empty list of items was provided.
	  */
	buildNested = (parents, items, level) => {
		if (level >= 2) // one look at couple of levels from top.
			return null;
		let objects = [];
		let functions = [];
		let other = [];
		for (let i = 0; i < items.length; i++) {
			let type = typeof items[i].obj;
			if (type === "function") {
				functions.push(this.buildListItem(parents, items[i].name, items[i].obj, level+1));
			} else if (type === "object") {
				objects.push(this.buildListItem(parents, items[i].name, items[i].obj, level+1));
			} else {
				other.push(this.buildListItem(parents, items[i].name, items[i].obj, level+1));
			}
		}
		let r = [];
		if (functions.length > 0)
			r = r.concat([<Subheader key={parents+".headerFunction"}>Functions</Subheader>].concat(functions));
		if (objects.length > 0)
			r = r.concat([<Subheader key={parents+".headerObjects"}>Objects</Subheader>].concat(objects));
		if (other.length > 0)
			r = r.concat([<Subheader key={parents+".headerOther"}>Other</Subheader>].concat(other));
		if (r.length > 0 && level < 2)
			r.push(<Divider key="divider" />);

		return r;
	}
	
	render() {
		// On top level, items are grouped under their initials.
		// onlyOwnProperties is used only on this level.
		let byInitial = {}
		let initials = [];
		let rootobj = eval("" + this.props.root);
		for (let i in rootobj) {
			if (rootobj.hasOwnProperty(i) || !this.props.onlyOwnProperties) {
				const initial = i.substring(0,1)
				if (!(initial in byInitial)) {
					byInitial[initial] = []
					initials.push(initial);
				}
				byInitial[initial].push({name: i, obj: rootobj[i]});
			}
		}
		initials.sort();
		let listRows = [];
		for (var iindex = 0; iindex < initials.length; iindex++) {
			const initial = initials[iindex];
			if (byInitial.hasOwnProperty(initial)) {
				let items = byInitial[initial];
				// Calling buildNested, this recursively uses buildListItem and buildNested up to termination level.
				let nested = this.buildNested(this.props.root, items, 0);
				const letterCol = "#" + ((iindex%2)*200+16).toString(16) + ((iindex%5)*50+16).toString(16) + ((iindex%20)*10+16).toString(16);
				listRows.push(
					<ListItem key={initial}
						leftAvatar={<Avatar	size={35} backgroundColor={letterCol}>{initial}</Avatar>}
						nestedItems={nested}
					>Starting with: {initial}</ListItem>
				);
			}
		}
	
		return (
			<div>
				<h1 style={{textAlign: "center"}}><i>{this.props.root}</i> properties in this browser.</h1>
				<List>
					{listRows}
				</List>
			</div>
		);
	}
}

/**
  * The main application
  * consists of the three top 
  * level components.
  */
class App extends Component {
	constructor() {
		super();
		this.state = {
			objectName: "window",
			onlyOwnProperties: true,
		};
	}
	
	handleChange = (e, i, v) => {
		this.setState({
			objectName: v,
		});
	}
	
	handleToggle = (e, checked) => {
		this.setState({
			onlyOwnProperties: checked,
		});
	}
	
	render() {
		return (
			<MuiThemeProvider>
				<Paper style={{width:800}}>
					<SelectField
						floatingLabelText="Object to inspect"
						value={this.state.objectName}
						onChange={this.handleChange}
					>
						<MenuItem value="window" primaryText="window" />
						<MenuItem value="document" primaryText="document" />
						<MenuItem value="screen" primaryText="screen" />
					</SelectField>
					<Toggle style={{maxWidth: 250}} defaultToggled={true} label="Show only own properties" onToggle={this.handleToggle} />
					<Reflector root={this.state.objectName} onlyOwnProperties={this.state.onlyOwnProperties} />
				</Paper>
			</MuiThemeProvider>
			);
	}
}
export default App;
