import * as DialogFocusId from '../DialogFocusId/DialogFocusId.ts'
import * as InputName from '../InputName/InputName.ts'

export const getFocusSelector = (focusId: number): string => {
  if (focusId === DialogFocusId.Confirm) {
    return InputName.Confirm
  }
  return ''
}
