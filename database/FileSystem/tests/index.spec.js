import { _FileSystem } from '../index'

const storagePath = './database/FileSystem/tests/testStorage'
const fileName = 'testData'
const data = { data: 'some test data' }
const newData = { newData: 'some new data' }
const successFullResult = { error: false }

describe("FileSystem CRUD", () => {
  const FileSystem = new _FileSystem(storagePath)

  it("write file", () => {
    const result = FileSystem.writeJsonFile(fileName, data)
    expect(result).toEqual(successFullResult)
  })

  it("read file", () => {
    const result = FileSystem.readJsonFile(fileName)
    expect(result).toEqual({ ...successFullResult, data })
  })

  it("update file", () => {
    const { data: result } = FileSystem.updateJsonFile(fileName, newData)
    expect(result).toEqual({ ...data, ...newData })
  })

  it("delete file", () => {
    const result = FileSystem.deleteFile(fileName)
    expect(result).toEqual(successFullResult)
  })
})
