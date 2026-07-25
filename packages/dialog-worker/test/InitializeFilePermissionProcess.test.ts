import { expect, test } from '@jest/globals'
import { RpcId } from '@lvce-editor/constants'
import { get, RendererWorker } from '@lvce-editor/rpc-registry'
import { initializeFilePermissionProcess } from '../src/parts/InitializeFilePermissionProcess/InitializeFilePermissionProcess.ts'

test('initializes a lazy connection to the file permission process', async () => {
  using mockRendererWorkerRpc = RendererWorker.registerMockRpc({
    'SendMessagePortToExtensionHostWorker.sendMessagePortToSharedProcess'() {},
  })

  await initializeFilePermissionProcess()
  expect(mockRendererWorkerRpc.invocations).toEqual([])

  const rpc = get(RpcId.FilePermissionProcess)
  rpc.send('test')
  await new Promise((resolve) => setTimeout(resolve, 0))
  expect(mockRendererWorkerRpc.invocations).toEqual([
    [
      'SendMessagePortToExtensionHostWorker.sendMessagePortToSharedProcess',
      expect.anything(),
      'HandleMessagePortForFilePermissionProcess.handleMessagePortForFilePermissionProcess',
      RpcId.DialogWorker,
    ],
  ])
  await rpc.dispose()
})
