import * as React from "react";
import { FileUploader } from "baseui/file-uploader";
import { Select } from "baseui/select";

const TransInput = ({ parseCsv }) => {
  const [source, setSource] = React.useState([
    { label: "Elevations", id: "#F0F8FF" }
  ]);
  
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
        accept={['.csv']}
        onDrop={(data) => {parseCsv(data)}}
        // errorMessage={'Failed To Upload Csv'}
      />
    </>
  );
}

export default TransInput
