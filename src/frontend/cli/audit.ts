#!/usr/bin/env node
import { rainbow } from '../../shared/colors'
import { exec, echo } from 'shelljs'
import errorHandlerWrapper from '../../shared/errorHandlerWrapper'
import inquirer from 'inquirer'

const errorMessage = 'you are not a true dragon born.'

const audit = async () => {
  console.clear()
  echo(rainbow('Time to Stack Them Coins.'))
}

(async () => await errorHandlerWrapper(audit, errorMessage))();
