import type { ConfirmPromptOptions } from '../ConfirmPromptOptions/ConfirmPromptOptions.ts'
import type { ShowErrorMessageOptions } from '../ShowErrorMessageOptions/ShowErrorMessageOptions.ts'
import * as ConfirmPromptElectron from '../ConfirmPromptElectron/ConfirmPromptElectron.ts'
import * as ConfirmPromptStrings from '../ConfirmPromptStrings/ConfirmPromptStrings.ts'
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
