import * as ConfirmPromptStrings from '../ConfirmPromptStrings/ConfirmPromptStrings.ts'
import * as I18NString from '../I18NString/I18NString.ts'

const UiStrings = {
  Error: 'Error',
  Info: 'Info',
  Warning: 'Warning',
}

export const cancel = ConfirmPromptStrings.cancel
export const ok = ConfirmPromptStrings.ok
export const error = (): string => I18NString.i18nString(UiStrings.Error)
export const info = (): string => I18NString.i18nString(UiStrings.Info)
export const warning = (): string => I18NString.i18nString(UiStrings.Warning)
