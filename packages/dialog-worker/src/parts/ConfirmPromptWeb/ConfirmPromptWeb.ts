import { RendererProcess } from '@lvce-editor/rpc-registry'

export const prompt = async (message: string): Promise<boolean> => {
  return RendererProcess.invoke('ConfirmPrompt.prompt', message)
}
