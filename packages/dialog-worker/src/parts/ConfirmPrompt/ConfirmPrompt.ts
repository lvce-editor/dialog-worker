import type { ConfirmPromptOptions2 } from '../ConfirmPromptOptions2/ConfirmPromptOptions2.ts'
import type { ConfirmPromptOptions3 } from '../ConfirmPromptOptions3/ConfirmPromptOptions3.ts'
import type { ConfirmPromptOptions } from '../ConfirmPromptOptions/ConfirmPromptOptions.ts'
import type { ShowErrorMessageOptions } from '../ShowErrorMessageOptions/ShowErrorMessageOptions.ts'
import * as ConfirmPromptElectron from '../ConfirmPromptElectron/ConfirmPromptElectron.ts'
import * as ConfirmPromptStrings from '../ConfirmPromptStrings/ConfirmPromptStrings.ts'
import * as ConfirmPromptWeb3 from '../ConfirmPromptWeb/ConfirmPromptWeb3.ts'
import * as ConfirmPromptWeb from '../ConfirmPromptWeb/ConfirmPromptWeb.ts'
import * as Platform from '../Platform/Platform.ts'
import * as PlatformType from '../PlatformType/PlatformType.ts'

export const prompt = async (
  message: string,
  {
    cancelMessage = ConfirmPromptStrings.cancel(),
    confirmMessage = ConfirmPromptStrings.ok(),
    platform = Platform.getPlatform(),
    title = '',
  }: ConfirmPromptOptions = {},
): Promise<boolean> => {
  if (platform === PlatformType.Electron) {
    return ConfirmPromptElectron.prompt(message, confirmMessage, title, cancelMessage)
  }
  return ConfirmPromptWeb.prompt(message)
}

export const prompt2 = async ({ cancelMessage, confirmMessage, platform, text, title }: ConfirmPromptOptions2): Promise<boolean> => {
  return prompt(text, { cancelMessage, confirmMessage, platform, title })
}

export const prompt3 = async (
  message: string,
  {
    cancelMessage = ConfirmPromptStrings.cancel(),
    confirmMessage = 'Save',
    discardMessage = "Don't Save",
    discardPrompt = 'Discard changes?',
    platform = Platform.getPlatform(),
    title = '',
  }: ConfirmPromptOptions3 = {},
): Promise<string> => {
  if (platform === PlatformType.Electron) {
    return ConfirmPromptElectron.prompt3(message, confirmMessage, title, cancelMessage, discardMessage)
  }
  return ConfirmPromptWeb3.prompt(message, { discardPrompt })
}

export const showErrorMessage = async ({
  confirmMessage = ConfirmPromptStrings.ok(),
  message,
  platform = Platform.getPlatform(),
  title = '',
}: ShowErrorMessageOptions): Promise<boolean> => {
  if (platform === PlatformType.Electron) {
    return ConfirmPromptElectron.promptError(message, confirmMessage, title)
  }
  return ConfirmPromptWeb.prompt(message)
}
