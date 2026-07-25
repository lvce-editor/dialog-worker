import * as ApplyRender from '../ApplyRender/ApplyRender.ts'
import * as DialogStates from '../DialogStates/DialogStates.ts'

export const render2 = (uid: number, diffResult: readonly number[]): readonly unknown[] => {
  const { oldState, scheduledState } = DialogStates.get(uid)
  DialogStates.set(uid, scheduledState, scheduledState)
  return ApplyRender.applyRender(oldState, scheduledState, diffResult)
}
