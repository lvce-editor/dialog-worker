import { expect, test } from '@jest/globals'
import { handleMessagePort } from '../src/parts/HandleMessagePort/HandleMessagePort.ts'

test('accepts a direct message port', async () => {
  const { port1, port2 } = new MessageChannel()

  await handleMessagePort(port1)

  expect(port1).toBeDefined()
  port1.close()
  port2.close()
})
