import * as React from "react";
import { FileUploader } from "baseui/file-uploader";
import { Select } from "baseui/select";

const TransInput = ({ parseCsv }) => {
  const [source, setSource] = React.useState([
    { label: "Elevations", id: "#F0F8FF" }
  ]);
  const [errorMessage, setErrorMessage] = React.useState(null);
  const [fileContent, setFileContent] = React.useState(null);

  const handleDrop = async (acceptedFiles, rejectedFiles) => {
    if (rejectedFiles.length > 0) {
      setErrorMessage('Some files were rejected.');
    } else {
      // Read and handle the content of the accepted file(s)
      try {
        const file = acceptedFiles[0]; // Assuming you're handling one file at a time
        const fileReader = new FileReader();

        fileReader.onload = (event) => {
          const content = event.target.result;
          setFileContent(content);

          // Do something with the content, e.g., display it or send it to a server
          console.log('File content:', content);
        };

        fileReader.readAsText(file);
      } catch (error) {
        console.error('Error reading file:', error);
        setErrorMessage('Error reading the file.');
      }
    }
  };
  
  return (
    <>
      <Select
        options={[
          { label: "Elevations", id: "elevations" },
          { label: "CapitalOne", id: "capitalone" }
        ]}
        value={source}
        placeholder="Select Source"
        onChange={params => setSource(params.value)}
      />
      <FileUploader
        errorMessage={errorMessage}
        onDrop={handleDrop}
        overrides={{
          Root: {
            style: {
              borderStyle: 'dashed',
            },
          },
        }}
      />
    </>
  );
}

export default TransInput
