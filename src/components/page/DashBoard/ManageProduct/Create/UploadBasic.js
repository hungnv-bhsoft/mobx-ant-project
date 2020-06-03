import React from 'react';
import axios from 'axios';
import styled from 'styled-components';


const FormStyle = styled.form`
    border: 1px solid #333;
    padding: 10px;
    display: flex;
    flex-direction: column;
`;
const Input = styled.input`
    margin-bottom: 5px;
`;

const UploadBasic = () => {
    const [file,setFile] = React.useState(null);
    const [title,setTitle] = React.useState('');

    const handleFile = event => {
        setFile(event.target.files[0]);
    }

    const handleText = event => {

        setTitle(event.target.value);
    }


    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(file.name);
        const formData = new FormData();
        const data = {
            title
        };

        formData.append(`files.cover`,file);
        formData.append('data',JSON.stringify(data));

        // const res = await axios.post('http://localhost:1337/images',formData);
        // console.log(res);
        for (var pair of formData.entries()) {
            console.log(pair);
        }
    }
    return (
        <FormStyle
          onSubmit={handleSubmit}
          className="form"
        >
            <h3 style={{ textAlign : 'center'}}>Test</h3>
            <Input type="text" name="title" onChange={handleText}/>
            <Input type="file" name="cover" onChange={handleFile} />
            <button>Upload</button>
        </FormStyle>
    )
}

export default UploadBasic;
