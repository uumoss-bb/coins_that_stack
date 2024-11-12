
import { config, echo, exit } from 'shelljs'
import { red, yellow } from './colors'

const errorHandlerWrapper = async (func: () => void, errorMessage: string) => {
  config.fatal = true

  try {
    await func()
  } catch(error: any) {
    if(error.message.includes('User force closed the prompt')) {
      echo(yellow('canceled'))
      exit(1)
    }
    echo(red(errorMessage))
    console.log(error)
    exit(1)
  }
}

export default errorHandlerWrapper
