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
  * This class encapsulates the comment editing dialog.
  */
class Comment extends Component {
	constructor() {
		super();
		this.state = {
			editedValue: null,
		};
	}
	
	commentEdit = (event) => {
		this.setState({
			editedValue: event.target.value,
		});
	}
	
	close = (save) => {
		this.props.onClose(save, this.state.editedValue);
		this.setState({
			editedValue: null,
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
				<Dialog
					title="Edit comment"
					actions={actions}
					modal={false}
					open={this.props.open}
					onRequestClose={() => {this.close(false);}}
				>
					<TextField 
					 id="commentField" 
					 disabled={false} 
					 value={this.state.editedValue===null?this.props.value:this.state.editedValue} 
					 onChange={this.commentEdit} 
					/>
				</Dialog>	
			</div>
		);
	}
}

/**
  * This stateless class encapsulates the popover for options.
  */
class Operations extends Component {
	render() {
		return (
			<Popover 
				open={this.props.open} 
				onRequestClose={() => {this.props.onClose()}}
				anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
				targetOrigin={{horizontal: 'left', vertical: 'bottom'}}	
				anchorEl={this.props.popupAnchor}
				zDepth={3}
			>
				<div>
					<RaisedButton fullWidth={true} label="Make favorite" onClick={this.props.makeFavorite} disabled={this.props.favoriteDisabled} />
				</div>
				<div>
					<RaisedButton fullWidth={true} label="Move to top" onClick={this.props.moveToTop} disabled={this.props.toTopDisabled} />
				</div>
			</Popover>
		);
	}
}

/**
  * This demo application illustrates the use of table. As can be seen, it can contains
  * different components. It has a single dialog for editing commments and single popup
  * for options. As they are recycled for each row, state.editedIndex is used to remember
  * which value is being edited currently.
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
			optionsOpen: false,
			commentOpen: false,
			editedIndex: null,
			favorite: 2,
		};
	}

	showOptions = (event, index) => {
		this.setState({
			optionsOpen: true, 
			popupAnchor: event.currentTarget,
			editedIndex: index,
		});	
	}
	
	makeFavorite = () => {
		this.setState({
			optionsOpen: false,
			favorite: this.state.editedIndex,
		});
	}
	
	moveToTop =() => {
		let logos = this.state.logos;
		logos.unshift(logos[this.state.editedIndex]);
		logos.splice(this.state.editedIndex+1, 1);
		this.setState({
			logos: logos,
			favorite: this.state.favorite===this.state.editedIndex?0:this.state.favorite<this.state.editedIndex?this.state.favorite+1:this.state.favorite,
			optionsOpen: false,
		});
	}
	
	editComment = (index) => {
		this.setState({
			editedIndex: index,
			commentOpen: true,
		});
	}
	
	commentEdited = (save, comment) => {
		if (save) {
			let logos = this.state.logos;
			logos[this.state.editedIndex].comment = comment;
			this.setState({
				logos: logos,
			});
		}
		this.setState({
			commentOpen: false,
		});
	}
	
	render() {
		let selectedComment = "";
		if (this.state.editedIndex !== null && this.state.editedIndex >= 0)
			selectedComment = this.state.logos[this.state.editedIndex].comment;
		if (selectedComment === null)
			selectedComment = "";
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
								<TableRowColumn><RaisedButton label="Edit..." onClick={(e) => {this.editComment(index)}}/></TableRowColumn>
								<TableRowColumn><IconButton onClick={(e) => {this.showOptions(e, index)}}><MoreVertIcon /></IconButton></TableRowColumn>
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
					
					<Comment 
						value={selectedComment} 
						onClose={this.commentEdited} 
						open={this.state.commentOpen} 
					/>
					<Operations 
						onClose={() => {this.setState({optionsOpen: false});}}
						open={this.state.optionsOpen}
						popupAnchor={this.state.popupAnchor}
						makeFavorite={() => {this.makeFavorite();}}
						favoriteDisabled={this.state.editedIndex===null || this.state.editedIndex===this.state.favorite}
						moveToTop={() => {this.moveToTop();}}
						toTopDisabled={this.state.editedIndex===null || this.state.editedIndex===0}
					/>
				</div>
			</MuiThemeProvider>
		);
	}
}

export default App;
