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

const choose = async (message:string, options: string[]) => {
  const answers = await inquirer.prompt([
    {
      type: 'list',
      name: 'choice',
      message: message,
      choices: options
    }
  ]);
  return answers.choice
}

export {
  confirm,
  input,
  choose
}
