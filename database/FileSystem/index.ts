import * as fs from 'fs';

export const STORAGE_PATH = './personalStorage'

class _FileSystem {
  private storagePath: string
  private getFilePath = (fileName: string) => `${this.storagePath}/${fileName}.json`

  constructor(storagePath: string) {
    this.checkStorageExists(storagePath)
    this.storagePath = storagePath
  }

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
      const data = fs.readFileSync(this.getFilePath(fileName), 'utf-8');
      return { error: false, data: JSON.parse(data) }
    } catch (err) {
        const errorMsg = 'Failed to READ json file'
        console.error(errorMsg, err);
        return { error: errorMsg, data: {} }
    }
  }

  writeJsonFile = (fileName: string, data: Object) => {
    try {
      const json = JSON.stringify(data, null, 2)
      fs.writeFileSync(this.getFilePath(fileName), json, 'utf-8');
      return { error: false }
    } catch (err) {
        const errorMsg = 'Failed to WRITE json file'
        console.error(errorMsg, err);
        return { error: errorMsg, fileName }
    }
  }

  updateJsonFile = (fileName: string, newData: Object) => {
    const { data } = this.readJsonFile(fileName)
    const freshData = { ...data, ...newData }
    const { error: writeError } = this.writeJsonFile(fileName, freshData)

    if(writeError) {
      const errorMsg = 'Failed to UPDATE json file'
      console.error(errorMsg, writeError);
      return { error: errorMsg }
    }

    return { error: false, data: freshData }
  }

  deleteFile(fileName: string) {
    try {
      fs.unlinkSync(this.getFilePath(fileName));
      return { error: false }
    } catch (err) {
      const errorMsg = 'Failed to DELETE json file'
      console.error(errorMsg, err);
      return { error: errorMsg, fileName }
    }
  }
}

export { _FileSystem }

export default new _FileSystem(STORAGE_PATH)
