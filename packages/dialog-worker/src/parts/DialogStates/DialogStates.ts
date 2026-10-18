import * as ViewletRegistry from '@lvce-editor/viewlet-registry'
import type { DialogState } from '../DialogState/DialogState.ts'

export const {
  clear,
  createDirectEventCommandMap,
  dispose,
  get,
  getCommandIds,
  registerCommands,
  set,
  wrapSerialAsyncCommand: wrapAsyncCommand,
  wrapSerialCommand: wrapCommand,
} = ViewletRegistry.create<DialogState>()
