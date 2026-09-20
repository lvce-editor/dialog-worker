import type { ConfirmPromptOptions3 } from '../ConfirmPromptOptions3/ConfirmPromptOptions3.ts'
import * as ConfirmPromptWeb from './ConfirmPromptWeb.ts'

export const prompt = async (message: string, { discardPrompt = 'Discard changes?' }: ConfirmPromptOptions3 = {}): Promise<string> => {
  const shouldSave = await ConfirmPromptWeb.prompt(message)
  if (shouldSave) {
    return 'save'
  }
  const shouldDiscard = await ConfirmPromptWeb.prompt(discardPrompt)
  if (shouldDiscard) {
    return 'discard'
  }
  return 'cancel'
}
