import { expect, test } from '@jest/globals'
import { RpcId } from '@lvce-editor/constants'
import { registerMockRpc } from '@lvce-editor/rpc-registry'
import * as ConfirmPromptWeb3 from '../src/parts/ConfirmPromptWeb/ConfirmPromptWeb3.ts'

test('prompt - saves when the first prompt is confirmed', async () => {
  const calls: string[] = []
  const mockRpc = registerMockRpc(RpcId.RendererProcess, {
    'ConfirmPrompt.prompt'(message: string): boolean {
      calls.push(message)
      return true
    },
  })
  await expect(ConfirmPromptWeb3.prompt('Save?', { discardPrompt: 'Discard?' })).resolves.toBe('save')
  expect(calls).toEqual(['Save?'])
  expect(mockRpc.invocations).toEqual([['ConfirmPrompt.prompt', 'Save?']])
})

test('prompt - discards when the second prompt is confirmed', async () => {
  const calls: string[] = []
  let count = 0
  const mockRpc = registerMockRpc(RpcId.RendererProcess, {
    'ConfirmPrompt.prompt'(message: string): boolean {
      calls.push(message)
      count++
      return count === 2
    },
  })
  await expect(ConfirmPromptWeb3.prompt('Save?', { discardPrompt: 'Discard?' })).resolves.toBe('discard')
  expect(calls).toEqual(['Save?', 'Discard?'])
  expect(mockRpc.invocations).toEqual([
    ['ConfirmPrompt.prompt', 'Save?'],
    ['ConfirmPrompt.prompt', 'Discard?'],
  ])
})

test('prompt - cancels when the second prompt is dismissed', async () => {
  const calls: string[] = []
  const mockRpc = registerMockRpc(RpcId.RendererProcess, {
    'ConfirmPrompt.prompt'(message: string): boolean {
      calls.push(message)
      return false
    },
  })
  await expect(ConfirmPromptWeb3.prompt('Save?', { discardPrompt: 'Discard?' })).resolves.toBe('cancel')
  expect(calls).toEqual(['Save?', 'Discard?'])
  expect(mockRpc.invocations).toEqual([
    ['ConfirmPrompt.prompt', 'Save?'],
    ['ConfirmPrompt.prompt', 'Discard?'],
  ])
})

test('prompt - uses the default discard prompt', async () => {
  const calls: string[] = []
  const mockRpc = registerMockRpc(RpcId.RendererProcess, {
    'ConfirmPrompt.prompt'(message: string): boolean {
      calls.push(message)
      return false
    },
  })
  await expect(ConfirmPromptWeb3.prompt('Save?')).resolves.toBe('cancel')
  expect(calls).toEqual(['Save?', 'Discard changes?'])
  expect(mockRpc.invocations).toEqual([
    ['ConfirmPrompt.prompt', 'Save?'],
    ['ConfirmPrompt.prompt', 'Discard changes?'],
  ])
})
