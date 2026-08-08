import * as Assert from '@lvce-editor/assert'
import { MainProcess } from '@lvce-editor/rpc-registry'
import * as GetWindowId from '../GetWindowId/GetWindowId.ts'
import * as Product from '../Product/Product.ts'

type ElectronMessageBoxOptions = Omit<MainProcess.ElectronMessageBoxOptions, 'productName' | 'windowId'>

export const showMessageBox = async (options: ElectronMessageBoxOptions): Promise<number | undefined> => {
  Assert.object(options)
  const productName = Product.getProductNameLong()
  const windowId = await GetWindowId.getWindowId()
  const finalOptions = {
    ...options,
    productName,
    windowId,
  }
  return MainProcess.showMessageBox(finalOptions)
}
