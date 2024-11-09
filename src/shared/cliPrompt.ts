import inquirer from "inquirer";

const confirm = (message:string) => inquirer.prompt({
  type:'confirm',
  name: 'confirm',
  message
})


export {
  confirm
}
