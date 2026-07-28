import type { BasicAuthChallenge } from '../BasicAuthChallenge/BasicAuthChallenge.ts'
import * as BasicAuthPrompt from '../BasicAuthPrompt/BasicAuthPrompt.ts'
import * as ConfirmPrompt from '../ConfirmPrompt/ConfirmPrompt.ts'
import * as Create from '../Create/Create.ts'
import * as DialogStates from '../DialogStates/DialogStates.ts'
import * as Diff2 from '../Diff2/Diff2.ts'
import * as Dispose from '../Dispose/Dispose.ts'
import * as ElectronDialog from '../ElectronDialog/ElectronDialog.ts'
import * as GetKeyBindings from '../GetKeyBindings/GetKeyBindings.ts'
import * as HandleClickButton from '../HandleClickButton/HandleClickButton.ts'
import * as HandleClickClose from '../HandleClickClose/HandleClickClose.ts'
import * as HandleFocusIn from '../HandleFocusIn/HandleFocusIn.ts'
import * as HandleInput from '../HandleInput/HandleInput.ts'
import * as HandleMessagePort from '../HandleMessagePort/HandleMessagePort.ts'
import * as HandleSubmit from '../HandleSubmit/HandleSubmit.ts'
import * as LoadContent2 from '../LoadContent2/LoadContent2.ts'
import * as Render2 from '../Render2/Render2.ts'
import * as RenderEventListeners from '../RenderEventListeners/RenderEventListeners.ts'
import * as ShowDialog from '../ShowDialog/ShowDialog.ts'
import * as ShowWarning from '../ShowWarning/ShowWarning.ts'

export const dialogViewCommandMap = {
  'Dialog.handleClickButton': DialogStates.wrapCommand(HandleClickButton.handleClickButton),
  'Dialog.handleClickClose': DialogStates.wrapCommand(HandleClickClose.handleClickClose),
  'Dialog.handleFocusIn': DialogStates.wrapAsyncCommand(HandleFocusIn.handleFocusIn),
  'Dialog.handleInput': DialogStates.wrapCommand(HandleInput.handleInput),
  'Dialog.handleSubmit': DialogStates.wrapCommand(HandleSubmit.handleSubmit),
}

const showBasicAuthPrompt = (challenge: BasicAuthChallenge): Promise<void> => {
  return BasicAuthPrompt.show(challenge)
}

export const commandMap = {
  'BasicAuthPrompt.show': showBasicAuthPrompt,
  'ConfirmPrompt.prompt': ConfirmPrompt.prompt,
  'ConfirmPrompt.showErrorMessage': ConfirmPrompt.showErrorMessage,
  'Dialog.create': Create.create,
  'Dialog.diff2': Diff2.diff2,
  'Dialog.dispose': Dispose.dispose,
  'Dialog.getCommandIds': DialogStates.getCommandIds,
  'Dialog.getKeyBindings': GetKeyBindings.getKeyBindings,
  ...dialogViewCommandMap,
  'Dialog.loadContent2': DialogStates.wrapAsyncCommand(LoadContent2.loadContent2),
  'Dialog.render2': Render2.render2,
  'Dialog.renderEventListeners': RenderEventListeners.renderEventListeners,
  'Dialog.show': ShowDialog.showDialog,
  'Dialog.showWarning': ShowWarning.showWarning,
  'ElectronDialog.showMessageBox': ElectronDialog.showMessageBox,
  'HandleMessagePort.handleMessagePort': HandleMessagePort.handleMessagePort,
}
