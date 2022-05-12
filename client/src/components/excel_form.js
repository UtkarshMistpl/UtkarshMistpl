import React from 'react';
import axios from 'axios';
import { Button } from '@material-ui/core';

const ExcelForm = (props) => {
  const table = props.table;
  // a local state to store the currently selected file.
  const [selectedFile, setSelectedFile] = React.useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault()
    const formData = new FormData();
    formData.append("file", selectedFile);
    if(table=="club"){
    try {
      const response = await axios({
        method: "post",
        url: "/uploadfile",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      }).then((response)=>{

        alert("success");
      window.location.reload(); 

      });
     
    } catch(error) {
      console.log(error)
    }
  }else{
    try {
      const response = await axios({
        method: "post",
        url: "/uploadfileplayer",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      }).then((response)=>{

        alert("success");
      window.location.reload(); 

      });
     
    } catch(error) {
      console.log(error)
    }
  }
  }

  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0]);
  }

  return (
    <div>
      <h4>Add list of {table}</h4>
    <form onSubmit={handleSubmit} style={{
      marginBottom:"2rem"
    }}>
      <input type="file" name='file' onChange={handleFileSelect}/>
      <Button type="submit" size='small' color="primary" variant='outlined' >Upload File</Button>
      {/* <Button variant="contained" size="small" color="primary" onClick={()=>{Edit()}} style={{marginTop:"2rem"}} > UPDATE </Button> */}

    </form>
    </div>
  )
};

export default ExcelForm;