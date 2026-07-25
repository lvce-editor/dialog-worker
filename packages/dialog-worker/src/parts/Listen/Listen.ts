import * as InitializeMainProcess from '../InitializeMainProcess/InitializeMainProcess.ts'
import * as InitializeRendererProcess from '../InitializeRendererProcess/InitializeRendererProcess.ts'
import * as InitializeRendererWorker from '../InitializeRendererWorker/InitializeRendererWorker.ts'

export const listen = async (): Promise<void> => {
  await InitializeRendererWorker.initializeRendererWorker()
  await Promise.all([InitializeMainProcess.initializeMainProcess(), InitializeRendererProcess.initializeRendererProcess()])
}
