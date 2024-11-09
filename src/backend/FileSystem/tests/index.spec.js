import { _FileSystem } from '../index'

const storagePath = './backend/FileSystem/tests/testStorage'
const fileName = 'testData'
const data = { data: 'some test data' }
const newData = { newData: 'some new data' }
const successFullResult = { error: false }

describe("FileSystem CRUD", () => {
  const FileSystem = new _FileSystem(storagePath)

  it("write file", () => {
    const result = FileSystem.writePersonalFile(fileName, data)
    expect(result).toEqual({ ...successFullResult, data })
  })

  it("read file", () => {
    const result = FileSystem.readPersonalFile(fileName)
    expect(result).toEqual({ ...successFullResult, data })
  })

  it("update file", () => {
    const { data: result } = FileSystem.updatePersonalFile(fileName, newData)
    expect(result).toEqual({ ...data, ...newData })
  })

  it("delete file", () => {
    const result = FileSystem.deleteFile(fileName)
    expect(result).toEqual({ ...successFullResult, data: { fileName } })
  })
})
