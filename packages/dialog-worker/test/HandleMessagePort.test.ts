import { expect, test } from '@jest/globals'
import { PlainMessagePortRpc } from '@lvce-editor/rpc'
import { commandMapRef } from '../src/parts/CommandMapRef/CommandMapRef.ts'
import { handleMessagePort } from '../src/parts/HandleMessagePort/HandleMessagePort.ts'

test('accepts commands over a direct message port', async () => {
  const { port1, port2 } = new MessageChannel()
  commandMapRef['Test.echo'] = (value: string): string => value

  try {
    await handleMessagePort(port1)
    const rpc = await PlainMessagePortRpc.create({
      commandMap: {},
      messagePort: port2,
    })

    await expect(rpc.invoke('Test.echo', 'ok')).resolves.toBe('ok')
    await rpc.dispose()
  } finally {
    delete commandMapRef['Test.echo']
    port1.close()
    port2.close()
  }
})
