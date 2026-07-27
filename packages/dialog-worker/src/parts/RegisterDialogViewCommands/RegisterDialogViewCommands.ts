import { dialogViewCommandMap } from '../CommandMap/CommandMap.ts'
import { registerCommands } from '../DialogStates/DialogStates.ts'

export const registerDialogViewCommands = (): void => {
  registerCommands(dialogViewCommandMap)
}
