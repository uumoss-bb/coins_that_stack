const fs = require('fs')

const normalizeElevationsData = ({ Memo, Date, Amount_Debit }) => ({
  source: 'elevations',
  title: Memo,
  transaction: Amount_Debit,
  date: Date
})

const normalizeCapitalOneData = ({ Description, Transaction_Date, Debit }) => ({
  source: 'capitalOne',
  title: Description,
  transaction: Debit,
  date: Transaction_Date
})

const normalizeVenmo = ({ Datetime, Note, To, ...others }) => ({
  source: 'venmo',
  title: `${To}: ${Note}`,
  transaction: others['Amount (total)'],
  date: Datetime
})

const normalizePayPal = ({ Date, Gross, Name, Type }) => ({
  source: 'paypal',
  title: Name ? Name : Type,
  transaction: Gross,
  date: Date
})

const sourceFunctions = {
  elevations: normalizeElevationsData,
  capitalone: normalizeCapitalOneData,
  venmo: normalizeVenmo,
  paypal: normalizePayPal
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
        console.log(err);
      else {
        console.log("File written successfully");
      }
    })
  )
}

async function normalize({source, path}) {
  const transactions = await getTransaction(path)
  const newTransactions = []

  for (let index = 0; index < transactions.length; index++) {
    const transaction = transactions[index];
    const normalizedTransaction = sourceFunctions[source](transaction)
    newTransactions.push(normalizedTransaction)
  }

  await writeJSON(`../normalizedTransactions/${source}_normalized.json`, JSON.stringify(newTransactions, null, 2))
}

(async ()=>{
  const files = [
    ['elevations', '../orig_elev_22_21.json'],
    ['capitalone', '../orig_cap_21_22.json'],
    ['venmo', '../orig_venmo_2022.json'],
    ['paypal', '../orig_paypal_21_22.json']
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