import * as React from "react";
import { FileUploader } from "baseui/file-uploader";
import { Select } from "baseui/select";
import Papa from 'papaparse'
import { replaceSpacesWithUnderscores } from '../../shared/normalizers'
import normalizeTransactions from "./normalizeTransactions";

const TransInput = ({ setTransactions, normalizeGroupsAndTrans }) => {
  const [source, setSource] = React.useState({ label: "Elevations", val: "elevations" });
  const [errorMessage, setErrorMessage] = React.useState(null);

  const handleNewTrans = async (acceptedFiles, rejectedFiles) => {
    if (rejectedFiles.length > 0) {
      setErrorMessage('Some files were rejected.');
    } else {
      // Read and handle the content of the accepted file(s)
      try {
        const file = acceptedFiles[0]; // Assuming you're handling one file at a time
        Papa.parse(file, {
          header: true,
          dynamicTyping: true,
          transformHeader: replaceSpacesWithUnderscores,
          complete: function ({ data: transactions }) {
            const normalTrans = normalizeTransactions({ source: source.val, transactions })
            setTransactions({ transactions: normalTrans, save: true })
            normalizeGroupsAndTrans()
          },
          error: function (error) {
            console.error(error)
            setErrorMessage('An error occurred during parsing');
          },
        });
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
          { label: "Elevations", val: "elevations" },
          { label: "CapitalOne", val: "capitalone" }
        ]}
        value={source}
        placeholder="Select Source"
        onChange={params => setSource(params.value[0])}
      />
      <FileUploader
        errorMessage={errorMessage}
        onDrop={handleNewTrans}
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
