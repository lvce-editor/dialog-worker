import * as DialogStates from '../DialogStates/DialogStates.ts'
import { diffType as dialogDiffType, isEqual as isDialogEqual } from '../DiffDialog/DiffDialog.ts'
import { diffType as focusDiffType, isEqual as isFocusEqual } from '../DiffFocus/DiffFocus.ts'
import { diffType as focusContextDiffType, isEqual as isFocusContextEqual } from '../DiffFocusContext/DiffFocusContext.ts'

export const diff2 = (uid: number): readonly number[] => {
  const { oldState, scheduledState } = DialogStates.get(uid)
  const diffResult: number[] = []
  const modules = [
    [isDialogEqual, dialogDiffType],
    [isFocusEqual, focusDiffType],
    [isFocusContextEqual, focusContextDiffType],
  ] as const
  for (const [isEqual, diffType] of modules) {
    if (!isEqual(oldState, scheduledState)) {
      diffResult.push(diffType)
    }
  }
  return diffResult
}
