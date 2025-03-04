#! /usr/bin/env node

import fs from "node:fs"
import path from "node:path"
import url from "node:url"
import importLocal from "import-local"

import logger from "@kg-cli/logger"
import prepareCheck from "./prepare.js"

const __filename = url.fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// 环境变量注入 package.json version 内容
const pkg = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, "../package.json"), { encoding: "utf-8" })
)
process.env.CLI_VERSION = pkg.version

// 优先本地的指令, 例如: 项目中安装 webpack/cli
if (importLocal(__dirname)) {
  logger.info("使用本地脚本")
} else {
  try {
    prepareCheck()
  } catch (error) {
    logger.error(error.message)
  }
}
