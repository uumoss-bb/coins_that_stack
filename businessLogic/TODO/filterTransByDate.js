
// export const dateToMiliSeconds = ({date}) => new Date(date).getTime()

// const filterTransByDate = ({ transactions, date }) => {
//   if(!date.length) {
//     return transactions
//   }

//   return transactions.filter(trans => {
//     const transDate = dateToMiliSeconds({ date: trans.date })
//     const filterStartDate = dateToMiliSeconds({ date: date[0] })
//     const filterEndDate = dateToMiliSeconds({ date: date[1] })

//     if(transDate >= filterStartDate && transDate <= filterEndDate) {
//       return trans
//     }
//   })
// }

// export default filterTransByDate
