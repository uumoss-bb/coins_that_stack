import * as React from "react";
import { FileUploader } from "baseui/file-uploader";
import { Select } from "baseui/select";

const TransInput = ({ setCsv, source, setSource }) => {
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
        accept="csv"
        onDropAccepted={setCsv}
        // errorMessage={'Failed To Upload Csv'}
      />
    </>
  );
}

export default TransInput
