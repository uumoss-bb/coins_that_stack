const fs = require('fs')

const normalizeElevationsData = ({ Memo, Date, Amount_Debit, Amount_Credit }) => {
  if(Memo) {
    return {
      source: 'elevations',
      title: Memo,
      transaction: Amount_Debit ? Amount_Debit * -1 : Amount_Credit,
      date: Date,
      type: Amount_Debit ? 'OUT' : 'IN'
    }
  }
}

const normalizeCapitalOneData = ({ Description, Transaction_Date, Debit, Credit }) => ({
  source: 'capitalOne',
  title: Description,
  transaction: Debit ? Debit : Credit,
  date: Transaction_Date,
  type: Debit ? 'OUT' : 'IN'
})

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
  type: ['Payment', 'Merchant Transaction'].includes(Type) ? 'OUT' : 'IN'
})

const normalizePayPal = ({ Date, Gross, Name, Type }) => {
  if(Type.includes('Payment')){
    return {
      source: 'paypal',
      title: Name,
      transaction: Gross * -1,
      date: Date,
      type: 'OUT'
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
  const newTransactions = []

  for (let index = 0; index < transactions.length; index++) {
    const transaction = transactions[index];
    const normalizedTransaction = sourceFunctions[source](transaction)
    if(normalizedTransaction) {
      newTransactions.push(normalizedTransaction)
    }
  }

  await writeJSON(`../normalizedTransactions/${source}_normalized.json`, JSON.stringify(newTransactions, null, 2))
}

(async ()=>{
  const files = [
    ['elevations', '../originalTransactions/orig_elev_22_21.json'],
    ['capitalone', '../originalTransactions/orig_cap_21_22.json'],
    ['venmo', '../originalTransactions/orig_venmo_2022.json'],
    ['paypal', '../originalTransactions/orig_paypal_21_22.json']
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