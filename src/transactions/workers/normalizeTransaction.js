const fs = require('fs')

const getTransactionType = (amount) => amount > 0 ? 'IN' : 'OUT'

const normalizeElevations = ({ Description, Posting_Date, Amount, Transaction_Category, Type }) => {
  return {
    source: 'elevations',
    title: Description,
    transaction: Amount * -1,
    date: Posting_Date,
    type: Type === "Transfer" ? "Transfer" : getTransactionType(Amount),
    category: Transaction_Category
  }
}

const normalizeCapitalOne = ({ Description, Transaction_Date, Debit, Credit, Category }) => {
  if(!Description.includes('PYMT')) {
    return {
      source: 'capitalOne',
      title: Description,
      transaction: Debit ? Debit : Credit,
      date: Transaction_Date,
      type: getTransactionType(Debit | Credit),
      category: Category
    }
  }
}

const normalizerFunctions = {
  elevations: normalizeElevations,
  capitalone: normalizeCapitalOne,
}

const getTransaction = (file) => {
  return new Promise( (res) =>
    fs.readFile(file, function read(err, data) {
      if (err) {
          throw err;
      }
      const content = data;
      res(JSON.parse(content.toString()))
    })
  )
}

const writeJSON = (filename, data) => {
  return new Promise( () =>
    fs.writeFile(filename, data, (err) => {
      if (err)
        console.error(err);
      else {
        console.log("File written successfully");
      }
    })
  )
}

async function normalize({source, path}) {
  const transactions = await getTransaction(path)
  let newTransactions = []

  for (let index = 0; index < transactions.length; index++) {
    const transaction = transactions[index];
    const normalizedTransaction = normalizerFunctions[source](transaction)
    newTransactions.push(normalizedTransaction)
  }
  
  await writeJSON(`./src/transactions/normalizedTransactions/${source}_normalized.js`, `export const ${source} = ` + JSON.stringify(newTransactions, null, 2))
}

(async ()=>{
  const files = [
    ['elevations', './src/transactions/originalTransactions/originalElevations.json'],
    // ['capitalone', './src/transactions/originalTransactions/originalCapOne.json'],
    // ['venmo', './src/transactions/originalTransactions/originalVenmo.json'],
    // ['paypal', './src/transactions/originalTransactions/originalPayPal.json']
  ]

  for (let index = 0; index < files.length; index++) {
    const file = files[index];
    console.log(file)
    normalize({
      source: file[0],
      path: file[1]
    });
  }
})(); 
