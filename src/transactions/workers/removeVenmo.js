const fs = require('fs')

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

async function removeVenmo() {
  const elevTransactions = await getTransaction("../elev_22_21.json")
  const newTransactions = []

  for (let index = 0; index < elevTransactions.length; index++) {
    const transaction = elevTransactions[index];
    if(!transaction.Memo.includes('VENMO')) {
      transaction.source = 'elevations'
      newTransactions.push(transaction)
    } else {
      console.log(transaction)
    }
  }

  await writeJSON('elev.json', newTransactions)
}

(async ()=>{
  await removeVenmo();
})(); 