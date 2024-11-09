
import { config, echo, exit } from 'shelljs'

const errorHandlerWrapper = async (func: () => void, errorMessage: string) => {
  config.fatal = true

  try {
    await func()
  } catch({ message }: any) {
    if(message.includes('User force closed the prompt')) {
      echo(('canceled'))
      exit(1)
    }
    echo((errorMessage))
    echo(message)
    exit(1)
  }
}

export default errorHandlerWrapper
