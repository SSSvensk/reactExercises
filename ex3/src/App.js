import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

const styles = theme => ({
  root: {
    display: 'flex',
  },
  formControl: {
    margin: theme.spacing.unit * 3,
  },
  group: {
    margin: `${theme.spacing.unit}px 0`,
  },
});

class App extends React.Component {
  state = {
    value: 'female',
  };

  handleChange = event => {
    this.setState({ value: event.target.value });
  };

  render() {
    const { classes } = this.props;

    return (
      <RadioGroup style={{ display: 'flex' }} row>
        <FormHelperText>Sort by:</FormHelperText>
        <FormControlLabel value="sizeDesc" control={<Radio />} label="Size descending" />
        <FormControlLabel value="sizeAsc" control={<Radio />} label="Size ascending" />
        <FormControlLabel value="nameAsc" control={<Radio />} label="Name ascending" />
        <FormControlLabel value="nameDesc" control={<Radio />} label="Name descending" />
      </RadioGroup>
    );
  }
}

export default App;

