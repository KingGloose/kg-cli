import os from "node:os"
import fs from "node:fs"

import checkRoot from "root-check"
import minimist from "minimist"
import dotenv from "dotenv"
import logger from "@kg-cli/logger"
import config from "@kg-cli/config"

import { pathExistsSync } from "../utils/file.js"

function prepareCheck() {
  logger.notice("cli version: " + process.env.CLI_VERSION)
  checkInputArgs() // 检查输入的参数，如果有--debug才打印debug信息
  checkRootPremisstion() // 检查是否为root权限, 有root权限就降级
  checkUserHomme() // 检查是否有userhome
  checkCliEnv() // 检查脚手架环境变量
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
  logger.verbose("检查 userhome 结束", userhome)
}

function checkInputArgs() {
  const args = minimist(process.argv.slice(2))
  if (args[config.DEBUG_MODE_ARGS]) {
    logger.setLevel(config.DEBUG_LOG_LEVEL)
  } else {
    logger.setLevel(config.NOT_DEBUG_LOG_LEVEL)
  }
  logger.verbose("检查输入参数结束", args)
}

function checkCliEnv() {
  logger.verbose("开始检查环境变量")
}

export default prepareCheck
