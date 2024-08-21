import * as fs from 'fs';

export const STORAGE_PATH = './personalStorage'

class _FileSystem {

  constructor(storagePath: string) {
    this.checkStorageExists(storagePath)
    this.storagePath = storagePath
  }

  storagePath: string

  checkStorageExists(storagePath: string){
    if (!fs.existsSync(storagePath)) {
        try {
            fs.mkdirSync(storagePath, { recursive: true });
            console.log(`Folder created at: ${storagePath}`);
        } catch (err) {
            console.error('Error creating folder:', err);
            throw err
        }
    }
  }

  readJsonFile = (fileName: string) => {
    try {
      const data = fs.readFileSync(`${this.storagePath}/${fileName}.json`, 'utf-8');
      return JSON.parse(data)
    } catch (err) {
        const errorMsg = 'Failed to READ json file'
        console.error(errorMsg, err);
        return { error: errorMsg, fileName }
    }
  }

  writeJsonFile = (fileName: string, data: Object) => {
    try {
      const json = JSON.stringify(data, null, 2)
      fs.writeFileSync(`${this.storagePath}/${fileName}.json`, json, 'utf-8');
      return { error: false }
    } catch (err) {
        const errorMsg = 'Failed to WRITE json file'
        console.error(errorMsg, err);
        return { error: errorMsg, fileName }
    }
  }


  deleteFile(fileName: string) {
    try {
      fs.unlinkSync(`${this.storagePath}/${fileName}.json`);
      return { error: false }
    } catch (err) {
      const errorMsg = 'Failed to DELETE json file'
      console.error(errorMsg, err);
      return { error: errorMsg, fileName }
    }
  }
}

export default _FileSystem
