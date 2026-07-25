import * as ElectronDialog from '../ElectronDialog/ElectronDialog.ts'
import * as ElectronMessageBoxType from '../ElectronMessageBoxType/ElectronMessageBoxType.ts'

export const prompt = async (message: string, confirmMessage: string, title: string, cancelMessage: string): Promise<boolean> => {
  const result = await ElectronDialog.showMessageBox({
    buttons: [cancelMessage, confirmMessage],
    defaultId: 1,
    message,
    title,
    type: ElectronMessageBoxType.Question,
  })
  return result === 1
}

export const promptError = async (message: string, confirmMessage: string, title: string): Promise<boolean> => {
  const result = await ElectronDialog.showMessageBox({
    buttons: [confirmMessage],
    defaultId: 0,
    message,
    title,
    type: ElectronMessageBoxType.Error,
  })
  return result === 0
}
