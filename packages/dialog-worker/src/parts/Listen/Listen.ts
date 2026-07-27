import * as InitializeFilePermissionProcess from '../InitializeFilePermissionProcess/InitializeFilePermissionProcess.ts'
import * as InitializeMainProcess from '../InitializeMainProcess/InitializeMainProcess.ts'
import * as InitializeRendererProcess from '../InitializeRendererProcess/InitializeRendererProcess.ts'
import * as InitializeRendererWorker from '../InitializeRendererWorker/InitializeRendererWorker.ts'
import * as RegisterDialogViewCommands from '../RegisterDialogViewCommands/RegisterDialogViewCommands.ts'

export const listen = async (): Promise<void> => {
  RegisterDialogViewCommands.registerDialogViewCommands()
  await InitializeRendererWorker.initializeRendererWorker()
  await Promise.all([
    InitializeFilePermissionProcess.initializeFilePermissionProcess(),
    InitializeMainProcess.initializeMainProcess(),
    InitializeRendererProcess.initializeRendererProcess(),
  ])
}
