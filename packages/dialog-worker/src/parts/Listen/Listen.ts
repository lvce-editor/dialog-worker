import * as InitializeRendererProcess from '../InitializeRendererProcess/InitializeRendererProcess.ts'
import * as InitializeRendererWorker from '../InitializeRendererWorker/InitializeRendererWorker.ts'
import * as InitializeSharedProcess from '../InitializeSharedProcess/InitializeSharedProcess.ts'

export const listen = async (): Promise<void> => {
  await InitializeRendererWorker.initializeRendererWorker()
  await Promise.all([InitializeRendererProcess.initializeRendererProcess(), InitializeSharedProcess.initializeSharedProcess()])
}
