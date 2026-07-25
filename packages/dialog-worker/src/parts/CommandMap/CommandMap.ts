import * as ConfirmPrompt from '../ConfirmPrompt/ConfirmPrompt.ts'
import * as ElectronDialog from '../ElectronDialog/ElectronDialog.ts'

export const commandMap = {
  'ConfirmPrompt.prompt': ConfirmPrompt.prompt,
  'ConfirmPrompt.showErrorMessage': ConfirmPrompt.showErrorMessage,
  'ElectronDialog.showMessageBox': ElectronDialog.showMessageBox,
}
