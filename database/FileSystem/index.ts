import * as fs from 'fs';

export const STORAGE_PATH = './personalStorage'

type FileSystemReturn = { error: boolean | string, data: object }

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

  readJsonFile = (fileName: string): FileSystemReturn => {
    try {
      const data = fs.readFileSync(this.getFilePath(fileName), 'utf-8');
      return { error: false, data: JSON.parse(data) }
    } catch (err) {
        const errorMsg = 'Failed to READ json file for:' + fileName
        console.warn(errorMsg, err);
        return { error: errorMsg, data: { fileName } }
    }
  }

  writeJsonFile = (fileName: string, data: object): FileSystemReturn => {
    try {
      const json = JSON.stringify(data, null, 2)
      fs.writeFileSync(this.getFilePath(fileName), json, 'utf-8');
      return { error: false, data }
    } catch (err) {
        const errorMsg = 'Failed to WRITE json file for:' + fileName
        console.error(errorMsg, err);
        return { error: errorMsg, data: { fileName } }
    }
  }

  updateJsonFile = (fileName: string, newData: object): FileSystemReturn => {
    const { data } = this.readJsonFile(fileName)
    const freshData = { ...data, ...newData }
    const { error: writeError } = this.writeJsonFile(fileName, freshData)

    if(writeError) {
      const errorMsg = 'Failed to UPDATE json file for:' + fileName
      console.error(errorMsg, writeError);
      return { error: errorMsg, data: { fileName } }
    }

    return { error: false, data: freshData }
  }

  deleteFile(fileName: string): FileSystemReturn {
    try {
      fs.unlinkSync(this.getFilePath(fileName));
      return { error: false, data: { fileName } }
    } catch (err) {
      const errorMsg = 'Failed to DELETE json file for:' + fileName
      console.error(errorMsg, err);
      return { error: errorMsg, data: { fileName } }
    }
  }
}

export { _FileSystem }

export default new _FileSystem(STORAGE_PATH)
