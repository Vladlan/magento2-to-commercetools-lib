import fs from 'fs'
import path from 'path'

export const saveToFile = async (data: any, fileName = 'data.json') => {
  const dirname = path.dirname(fileName)
  const exist = isExists(dirname)
  if (!exist) {
    fs.mkdirSync(dirname, { recursive: true })
  }
  fs.writeFile(fileName, JSON.stringify(data), (err: any) => {
    if (err) {
      console.error(err)
      return
    }
    console.log(`File: '${fileName}' has been created`)
  })
}

export const saveToFileAsync = async (data: any, fileName = 'data.json') => {
  return new Promise((resolve, reject) => {
    const dirname = path.dirname(fileName)
    const exist = isExists(dirname)
    if (!exist) {
      fs.mkdirSync(dirname, { recursive: true })
    }
    fs.writeFile(fileName, JSON.stringify(data), (err: any) => {
      if (err) {
        console.error(err)
        reject(err)
        return
      }
      console.log(`File: '${fileName}' has been created`)
      resolve(null)
    })
  })
}

function isExists(path: string) {
  try {
    fs.accessSync(path)
    return true
  } catch {
    return false
  }
}
