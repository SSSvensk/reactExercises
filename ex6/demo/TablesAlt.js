import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import RaisedButton from 'material-ui/RaisedButton';
import Popover from 'material-ui/Popover';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconButton from 'material-ui/IconButton';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';

/**
  * This class encapsulates button and 
  * related dialog for editing a comment.
  */
class Comment extends Component {
	constructor() {
		super();
		this.state = {
			editedValue: "",
			open: false,
		};
	}
	
	commentEdit = (event) => {
		this.setState({
			editedValue: event.target.value,
		});
	}
	
	open = () => {
		this.setState({
			open: true,
			editedValue: this.props.initialValue!==null?this.props.initialValue:"",
		});
	}
	
	close = (save) => {
		this.props.onClose(save, this.props.targetIndex, this.state.editedValue);
		this.setState({
			open: false,
		});
	}
	
	render() {
		const actions = [
			<FlatButton
				label="Cancel"
				primary={true}
				onClick={() => {this.close(false);}}
			/>,
			<FlatButton
				label="OK"
				primary={true}
				keyboardFocused={true}
				onClick={() => {this.close(true);}}
			/>,
		];
		return (
			<div>
				<RaisedButton label="Edit..." onClick={this.open}/>
				<Dialog
					title="Edit comment"
					actions={actions}
					modal={false}
					open={this.state.open}
					onRequestClose={() => {this.close(false);}}
				>
					<TextField 
					 id="commentField" 
					 disabled={false} 
					 value={this.state.editedValue} 
					 onChange={this.commentEdit}
					/>
				</Dialog>	
			</div>
		);
	}
}

/**
  * This class encapsulates icon button and
  * related PopOver.
  */
class Operations extends Component {
	constructor() {
		super();
		this.state = {
			open: false,
			popupAnchor: null,
		};
	}
	
	show = (event) => {
		this.setState({
			open: true, 
			popupAnchor: event.currentTarget,
		});	
	}
	
	render() {
		return (
			<div>
				<IconButton onClick={this.show}><MoreVertIcon /></IconButton>
		
				<Popover 
					open={this.state.open} 
					onRequestClose={() => {this.setState({open: false});}}
					anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
					targetOrigin={{horizontal: 'left', vertical: 'bottom'}}	
					anchorEl={this.state.popupAnchor}
					zDepth={3}
				>
					<div>
						<RaisedButton 
							fullWidth={true} 
							label="Make favorite" 
							onClick={
								(e) => {
									this.props.makeFavorite(this.props.targetIndex); 
									this.setState({open: false});
								}
							} 
							disabled={this.props.favoriteDisabled} 
						/>
					</div>
					<div>
						<RaisedButton 
							fullWidth={true} 
							label="Move to top" 
							onClick={
								(e) => {
									this.props.moveToTop(this.props.targetIndex); 
									this.setState({open: false});
								}
							} 
							disabled={this.props.toTopDisabled} 
						/>
					</div>
				</Popover>
			</div>
		);
	}
}

/**
  * This alternate version has cleaner state but creates 
  * a dialog and popover for each table row. 
  */
class App extends Component {
	constructor() {
		super();
		this.state = {
			logos: [
				{image: "react1.png",
				 comment: null,
				},				
				{image: "react2.png",
				 comment: null,
				},
				{image: "react3.png",
				 comment: null,
				},
				{image: "react4.png",
				 comment: null,
				},
				{image: "react5.png",
				 comment: null,
				},
			],
			favorite: 2,
		};
	}

	makeFavorite = (index) => {
		this.setState({
			favorite: index,
		});
	}
	
	moveToTop = (index) => {
		let logos = this.state.logos;
		logos.unshift(logos[index]);
		logos.splice(index+1, 1);
		this.setState({
			logos: logos,
			favorite: this.state.favorite===index?0:this.state.favorite<index?this.state.favorite+1:this.state.favorite,
		});
	}
	
	commentEdited = (save, index, comment) => {
		if (save) {
			let logos = this.state.logos;
			logos[index].comment = comment;
			this.setState({
				logos: logos,
			});
		}
	}
	
	render() {
		return (
			<MuiThemeProvider>
				<div>
					<Table
						fixedHeader={false}
						fixedFooter={false}
						selectable={false}
						multiSelectable={false}
					>
						<TableHeader
							displaySelectAll={false}
							adjustForCheckbox={false}
						>
							<TableRow>
								<TableHeaderColumn tooltip="Icon">Icon</TableHeaderColumn>
								<TableHeaderColumn tooltip="Comment on the logo">Comment</TableHeaderColumn>
								<TableHeaderColumn tooltip="Edit comment">Edit</TableHeaderColumn>
								<TableHeaderColumn tooltip="More options">Options</TableHeaderColumn>
							</TableRow>
						</TableHeader>
						<TableBody
							displayRowCheckbox={false}
							deselectOnClickaway={true}
							showRowHover={true}
							stripedRows={true}
						>
						{this.state.logos.map( (row, index) => (
							<TableRow 
								key={index} 
								hoverable={true} 
								style={{background: (index===this.state.favorite?"lightyellow":"white")}}
							>
								<TableRowColumn><img alt="react logo" src={row.image}/></TableRowColumn>
								<TableRowColumn>{row.comment}</TableRowColumn>
								<TableRowColumn>
									<Comment 
										initialValue={row.comment} 
										targetIndex={index} 
										onClose={(s, i, v) => {this.commentEdited(s, i, v);}}
									/>
								</TableRowColumn>
								<TableRowColumn>
									<Operations 
										targetIndex={index}
										makeFavorite={(i) => {this.makeFavorite(i);}}
										favoriteDisabled={index===this.state.favorite}
										moveToTop={(i) => {this.moveToTop(i);}}
										toTopDisabled={index===0}
									/>
								</TableRowColumn>
							</TableRow>
						))}
						</TableBody>
						<TableFooter  adjustForCheckbox={false}>
							<TableRow>
								<TableRowColumn>Icon</TableRowColumn>
								<TableRowColumn colSpan="3">Comment</TableRowColumn>
							</TableRow>
						</TableFooter>
					</Table>
					
				</div>
			</MuiThemeProvider>
		);
	}
}

export default App;
