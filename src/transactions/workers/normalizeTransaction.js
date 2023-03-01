const fs = require('fs')

const normalizeElevationsData = ({ Memo, Date, Amount_Debit, Amount_Credit }) => {
  if(Memo && !Memo.includes('PAYPAL') && !Memo.includes('CAPITAL ONE') && !Memo.includes('Transfer') && !Amount_Credit) {
    return {
      source: 'elevations',
      title: Memo,
      transaction: Amount_Debit ? Amount_Debit * -1 : Amount_Credit,
      date: Date,
      type: Amount_Debit ? 'OUT' : 'IN',
      category: 'None'
    }
  }
}

const normalizeCapitalOneData = ({ Description, Posted_Date, Debit, Credit, Category }) => {
  if(!Description.includes('PYMT')) {
    return {
      source: 'capitalOne',
      title: Description,
      transaction: Debit ? Debit : Credit,
      date: Posted_Date,
      type: Debit ? 'OUT' : 'IN',
      category: Category
    }
  }
}

const normalizeVenmoAmount = (amount) =>  {
  amount = Number(amount.replace('$', ''))
  if(amount < 0) {
    return amount * -1
  }

  return amount
}

const normalizeVenmo = ({ Datetime, Note, To, Type, ...others }) => ({
  source: 'venmo',
  title: To ? `${To}: ${Note}` : 'Sent To Bank',
  transaction: normalizeVenmoAmount(others['Amount (total)']),
  date: Datetime,
  type: ['Payment', 'Merchant Transaction'].includes(Type) ? 'OUT' : 'IN',
  category: 'None'
})

const normalizePayPal = ({ Date, Gross, Name, Type }) => {
  if(Type.includes('Payment')){
    return {
      source: 'paypal',
      title: Name,
      transaction: Gross * -1,
      date: Date,
      type: 'OUT',
      category: 'None'
    }
  }
}

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
  const newTransactions = {}

  for (let index = 0; index < transactions.length; index++) {
    const transaction = transactions[index];
    const normalizedTransaction = sourceFunctions[source](transaction)
    if(normalizedTransaction) {
      const jsonId = JSON.stringify(normalizedTransaction)
      newTransactions[jsonId] = normalizedTransaction
    }
  }
  
  const listOfTransactions = Object.values(newTransactions)
  await writeJSON(`./src/transactions/normalizedTransactions/${source}_normalized.js`, `export const ${source} = ` + JSON.stringify(listOfTransactions, null, 2))
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