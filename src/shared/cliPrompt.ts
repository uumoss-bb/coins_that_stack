import inquirer from "inquirer";
import { echo, exit } from "shelljs";
import { yellow } from "./colors";

const basicConfirmResultHandler = async (confirmed:string) => {
  if(!confirmed) {
    echo(yellow('declined confirmation'))
    exit(0)
  }
}

const confirm = async (message:string, resultHandler = basicConfirmResultHandler) => {
  const result = await inquirer.prompt({
    type:'confirm',
    name: 'confirm',
    message
  })

  await resultHandler(result.confirm)
}

const input = async (message:string,) => {
  const result = await inquirer.prompt({
    type:'input',
    name: 'input',
    message
  })

  return result.input
}


export {
  confirm,
  input
}
