import { expect, test } from '@jest/globals'
import { RpcId } from '@lvce-editor/constants'
import { registerMockRpc } from '@lvce-editor/rpc-registry'
import * as ConfirmPromptWeb from '../src/parts/ConfirmPromptWeb/ConfirmPromptWeb.ts'

test('prompt', async () => {
  const calls: unknown[][] = []
  registerMockRpc(RpcId.RendererProcess, {
    'ConfirmPrompt.prompt'(message: string): boolean {
      calls.push([message])
      return true
    },
  })
  await expect(ConfirmPromptWeb.prompt('Continue?')).resolves.toBe(true)
  expect(calls).toEqual([['Continue?']])
})
