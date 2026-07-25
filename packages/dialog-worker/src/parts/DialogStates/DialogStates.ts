import * as ViewletRegistry from '@lvce-editor/viewlet-registry'
import type { DialogState } from '../DialogState/DialogState.ts'

export const { clear, dispose, get, getCommandIds, set, wrapAsyncCommand, wrapCommand } = ViewletRegistry.create<DialogState>()
