// import Papa from 'papaparse'
// import { replaceSpacesWithUnderscores } from './normalizers'
// import normalizeTransactions from "./normalizeTransactions";
// import LocalStore from "../../storage/LocalStorage/LocalStorage";

// const handleNewTrans = async (acceptedFiles, rejectedFiles) => {
//   if (rejectedFiles.length > 0) {
//     setErrorMessage('Some files were rejected.');
//   } else {
//     // Read and handle the content of the accepted file(s)
//     try {
//       const file = acceptedFiles[0]; // Assuming you're handling one file at a time
//       Papa.parse(file, {
//         header: true,
//         dynamicTyping: true,
//         transformHeader: replaceSpacesWithUnderscores,
//         complete: function ({ data: transactions }) {
//           const normalTrans = normalizeTransactions({ source: source.id, transactions })
//           const currentTrans = LocalStore.get('transactions')
//           setTransactions({ transactions: [...normalTrans, ...currentTrans], save: true })
//           normalizeStacksAndTrans()
//         },
//         error: function (error) {
//           console.error(error)
//           setErrorMessage('An error occurred during parsing');
//         },
//       });
//     } catch (error) {
//       console.error('Error reading file:', error);
//       setErrorMessage('Error reading the file.');
//     }
//   }
// };


//NOTES: I took this out of components/TransInput/Input.js it will need to be reworked to fit its new location.
