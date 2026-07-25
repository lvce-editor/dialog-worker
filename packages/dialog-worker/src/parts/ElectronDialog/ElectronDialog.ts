import * as Assert from '@lvce-editor/assert'
import { MainProcess } from '@lvce-editor/rpc-registry'
import type { ElectronMessageBoxOptions } from '../ElectronMessageBoxOptions/ElectronMessageBoxOptions.ts'
import * as GetWindowId from '../GetWindowId/GetWindowId.ts'
import * as Product from '../Product/Product.ts'

export const showMessageBox = async (options: ElectronMessageBoxOptions): Promise<number> => {
  Assert.object(options)
  const productName = Product.getProductNameLong()
  const windowId = await GetWindowId.getWindowId()
  const finalOptions = {
    ...options,
    productName,
    windowId,
  }
  return MainProcess.invoke('ElectronDialog.showMessageBox', finalOptions)
}
