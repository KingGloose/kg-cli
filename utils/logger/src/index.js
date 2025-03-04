import winston from "winston"
import chalk from "chalk"
import config from "@kg-cli/config"

class Logger {
  logger = null

  // 自定义日志级别和颜色
  customLevels = {
    levels: {
      error: 0,
      warn: 1,
      info: 2,
      success: 3,
      notice: 4,
      http: 5,
      verbose: 6,
      debug: 7,
    },
    colors: {
      error: "red",
      warn: "yellow",
      info: "blue",
      success: "green",
      notice: "green",
      http: "magenta",
      verbose: "gray",
      debug: "cyan",
    },
  }

  constructor() {
    this.logger = winston.createLogger({
      level: "notice", // 默认日志级别
      levels: this.customLevels.levels,
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.colorize(), // 让日志级别有颜色
            winston.format.printf(info => {
              const prefix = chalk.bgWhite.red.bold(` ${config.NAME} `)
              return `${prefix} [${info.level}]: ${info.message.join(" ")}`
            })
          ),
        }),
      ],
    })

    // 添加 winston 颜色支持
    winston.addColors(this.customLevels.colors)
  }

  // 定义日志方法
  error = (...text) => this.logger.error(this._formatLog(text))
  warn = (...text) => this.logger.warn(this._formatLog(text))
  info = (...text) => this.logger.info(this._formatLog(text))
  success = (...text) => this.logger.success(this._formatLog(text))
  notice = (...text) => this.logger.notice(this._formatLog(text))
  http = (...text) => this.logger.http(this._formatLog(text))
  verbose = (...text) => this.logger.verbose(this._formatLog(text))
  debug = (...text) => this.logger.debug(this._formatLog(text))

  _formatLog(text) {
    return text.map(item => {
      if (typeof item === "string") {
        return item
      } else {
        return JSON.stringify(item)
      }
    })
  }

  // 动态设置 logger level
  setLevel(level) {
    this.logger.level = level
  }
}

export default new Logger()
