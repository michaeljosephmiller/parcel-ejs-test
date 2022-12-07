import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const readJsonFile = async (filePath) => {
  let data = false
  if (filePath) {
    filePath = path.join(__dirname, filePath)
    let data = await fs
      .readFile(filePath, 'utf8')
      .then((data) => JSON.parse(data))
      .catch((err) => console.error(err.message))
    return data
  }
  return data
}

const saveToJsonFile = async (filePath, data) => {
  let success = false
  if (filePath && data) {
    filePath = path.join(__dirname, filePath)
    data = JSON.stringify(data, null, 2)
    success = await fs
      .writeFile(filePath, data, 'utf8')
      .then(() => true)
      .catch((err) => console.error(err.message))
  }
  return success
}

export { readJsonFile, saveToJsonFile }
