import inquirer from "inquirer";
import { echo, exit } from "shelljs";
import { yellow } from "./colors";

const basicConfirmResultHandler = (confirmed:string) => {
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

  resultHandler(result.confirm)
}


export {
  confirm
}
