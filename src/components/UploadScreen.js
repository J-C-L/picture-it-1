import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import Papa from 'papaparse';


class UploadScreen extends Component {
  constructor(props){
    super(props);
    this.state={
      parsedData:{},
      fileName:'',
    }
  }

  onDrop(acceptedFiles, rejectedFile) {
    var reader = new FileReader();

    reader.onload = event => {
      var dataAsJSON = Papa.parse(event.target.result, {
        header: true,
      })
      // this.props.onSubmit({
      //   fileName: acceptedFiles[0].name,
      //   parsedData: dataAsJSON,
      // })
      this.setState({
        fileName: acceptedFiles[0].name,
        parsedData: dataAsJSON,
      })
      this.props.onFileUpload(this.state.parsedData.data, this.state.fileName);
    }

    reader.readAsText(acceptedFiles[0])
  }


  render() {

    var dropArea;
    if (this.state.fileName){
      dropArea = (
        <div className="Upload">
          <Dropzone onDrop={(files) => this.onDrop(files)}>
            <div>Drag your data file here, or click to select file to upload.</div>
          </Dropzone>

          <div>
            Successfully uploaded file: {this.state.fileName}
          </div>
        </div>
      );
    }else{
      dropArea = (
        <div className="Upload">
          <Dropzone onDrop={(files) => this.onDrop(files)}>
            <div>Drag your data file here, or click to select file to upload.</div>
          </Dropzone>
        </div>
      );
    }

    return (
      <div>
      {dropArea}
      </div>
    );
  }
}

export default UploadScreen;