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

  readFile = (filePath: string): FileSystemReturn => {
    try {
      const data = fs.readFileSync(filePath, 'utf-8');
      return { error: false, data: JSON.parse(data) }
    } catch (err) {
        const errorMsg = 'Failed to READ json file for: ' + filePath
        console.log(errorMsg);
        return { error: errorMsg, data: { filePath } }
    }
  }

  writeFile = (fileName: string, data: object): FileSystemReturn => {
    try {
      const json = JSON.stringify(data, null, 2)
      fs.writeFileSync(fileName, json, 'utf-8');
      return { error: false, data }
    } catch (err) {
        const errorMsg = 'Failed to WRITE json file for: ' + fileName
        console.error(errorMsg, err);
        return { error: errorMsg, data: {} }
    }
  }

  deleteFile(fileName: string): FileSystemReturn {
    try {
      fs.unlinkSync(this.getFilePath(fileName));
      return { error: false, data: { fileName } }
    } catch (err) {
      const errorMsg = 'Failed to DELETE json file for: ' + fileName
      console.error(errorMsg);
      return { error: errorMsg, data: { fileName } }
    }
  }

  readPersonalFile = (fileName: string): FileSystemReturn =>
    this.readFile(this.getFilePath(fileName))

  writePersonalFile = (fileName: string, data: object): FileSystemReturn =>
    this.writeFile(this.getFilePath(fileName), data);

  updatePersonalFile = (fileName: string, newData: object): FileSystemReturn => {
    const { data } = this.readPersonalFile(fileName)
    const freshData = Array.isArray(newData) && Array.isArray(data) ? [ ...data, ...newData ] : { ...data, ...newData }
    const { error: writeError } = this.writePersonalFile(fileName, freshData)

    if(writeError) {
      const errorMsg = 'Failed to UPDATE json file for: ' + fileName
      console.error(errorMsg);
      return { error: errorMsg, data: {} }
    }

    return { error: false, data: freshData }
  }
}

export { _FileSystem }

export default new _FileSystem(STORAGE_PATH)
