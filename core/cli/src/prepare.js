import os from "node:os"
import fs from "node:fs"

import checkRoot from "root-check"
import minimist from "minimist"
import dotenv from "dotenv"
import logger from "@kg-cli/logger"
import config from "@kg-cli/config"

import { pathExistsSync } from "../utils/file.js"
import path from "node:path"

function prepareCheck() {
  logger.notice("cli version: " + process.env.CLI_VERSION)
  checkInputArgs() // 检查输入的参数，如果有--debug才打印debug信息
  checkRootPremisstion() // 检查是否为root权限, 有root权限就降级
  checkUserHomme() // 检查是否有userhome
  checkCliEnv() // 检查脚手架环境变量
  checkCliUpdate() // 检查脚手架最新版本
}

function checkRootPremisstion() {
  logger.verbose("开始检查root权限")
  checkRoot()
  logger.verbose("检查root权限结束")
}

function checkUserHomme() {
  logger.verbose("开始检查 userhome")
  const userhome = os.homedir()
  if (!userhome || !pathExistsSync(userhome)) {
    throw new Error(`当前用户主目录不存在`)
  }
  process.env.CLI_USER_HOME_PATH = userhome
  logger.verbose("检查 userhome 结束", userhome)
}

function checkInputArgs() {
  const args = minimist(process.argv.slice(2))
  const loggerLevel = args[config.DEBUG_MODE_ARGS]
    ? config.DEBUG_LOG_LEVEL
    : config.NOT_DEBUG_LOG_LEVEL
  logger.setLevel(loggerLevel)
  process.env.CLI_RUN_LOGER_LEVEL = loggerLevel
  logger.verbose("检查输入参数结束", args, loggerLevel)
}

function checkCliEnv() {
  logger.verbose("开始检查环境变量")
  const envPath = path.resolve(process.env.CLI_USER_HOME_PATH, ".env")
  if (pathExistsSync(envPath)) {
    dotenv.config({ path: envPath })
  }

  const userhome = process.env.CLI_USER_HOME_PATH
  process.env.CLI_HOME_PATH = path.resolve(
    userhome,
    process.env.CLI_HOME || config.DEFAULT_CLI_HOME_PATH
  )

  logger.verbose("检查环境变量结束", process.env.CLI_HOME_PATH)
}

function checkCliUpdate() {
  logger.verbose("开始检查更新")
  
  logger.verbose("检查更新结束")
}

export default prepareCheck
