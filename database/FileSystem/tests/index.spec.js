import _FileSystem from '../index'

const storagePath = './database/FileSystem/tests/testStorage'
const fileName = 'testData'
const testData = { data: 'some test data' }
const successFullResult = { error: false }

describe("FileSystem CRUD", () => {
  const FileSystem = new _FileSystem(storagePath)

  it("write file", () => {
    const result = FileSystem.writeJsonFile(fileName, testData)
    expect(result).toEqual(successFullResult)
  })

  it("read file", () => {
    const result = FileSystem.readJsonFile(fileName)
    expect(result).toEqual(testData)
  })

  it("delete file", () => {
    const result = FileSystem.deleteFile(fileName)
    expect(result).toEqual(successFullResult)
  })
})
