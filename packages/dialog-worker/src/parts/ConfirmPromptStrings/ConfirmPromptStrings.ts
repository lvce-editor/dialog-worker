import * as I18NString from '../I18NString/I18NString.ts'

const UiStrings = {
  Cancel: 'Cancel',
  Ok: 'Ok',
}

export const cancel = (): string => {
  return I18NString.i18nString(UiStrings.Cancel)
}

export const ok = (): string => {
  return I18NString.i18nString(UiStrings.Ok)
}
