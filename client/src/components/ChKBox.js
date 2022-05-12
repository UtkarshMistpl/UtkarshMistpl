import React from 'react'
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const ChKBox = (props) => {

// Our sample dropdown options

const options = props.data;
console.log(options);

return (
	<div >
	<Autocomplete
    onChange={(event, value) => console.log(value)} 
		multiple
		id="checkboxes-tags-demo"
		options={options}
		renderOption={(option, { selected }) => (
		<React.Fragment>
			<Checkbox
			icon={icon}
			checkedIcon={checkedIcon}
			style={{ marginRight: 8 }}
			checked={selected}
			/>
			{option}
		</React.Fragment>
		)}
		
		renderInput={(params) => (
		<TextField {...params} 
			
			placeholder="Choose" />
		)}
	/>
	</div>
);
}

export default ChKBox;
