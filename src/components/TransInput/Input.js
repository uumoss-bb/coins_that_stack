import * as React from "react";
import { FileUploader } from "baseui/file-uploader";
import { Select } from "baseui/select";
import Papa from 'papaparse'
import { replaceSpacesWithUnderscores } from '../../shared/normalizers'
import normalizeTransactions from "./normalizeTransactions";
import LocalStore from "../../storage/LocalStorage/LocalStorage";

const TransInput = ({ setTransactions, normalizeGroupsAndTrans }) => {
  const [source, setSource] = React.useState({ label: "Elevations", id: "elevations" });
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
            const normalTrans = normalizeTransactions({ source: source.id, transactions })
            const currentTrans = LocalStore.get('transactions')
            setTransactions({ transactions: [...normalTrans, ...currentTrans], save: true })
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
          { label: "Elevations", id: "elevations" },
          { label: "Capital One", id: "capitalone" },
          { label: "Fort Financial", id: "fortFinancial" }
        ]}
        value={[source]}
        placeholder="Select Source"
        onChange={({value}) => setSource(value[0])}
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
