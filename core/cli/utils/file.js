import { accessSync } from "node:fs"

export function pathExistsSync(path) {
  try {
    accessSync(path)
    return true
  } catch {
    return false
  }
}
