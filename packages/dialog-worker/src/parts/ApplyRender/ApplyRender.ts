import type { DialogState } from '../DialogState/DialogState.ts'
import * as DiffType from '../DiffType/DiffType.ts'
import * as RenderDialog from '../RenderDialog/RenderDialog.ts'
import * as RenderFocus from '../RenderFocus/RenderFocus.ts'
import * as RenderFocusContext from '../RenderFocusContext/RenderFocusContext.ts'

type Renderer = (oldState: DialogState, newState: DialogState) => readonly unknown[]

const getRenderer = (diffType: number): Renderer => {
  switch (diffType) {
    case DiffType.RenderDialog:
      return RenderDialog.renderDialog
    case DiffType.RenderFocus:
      return RenderFocus.renderFocus
    case DiffType.RenderFocusContext:
      return RenderFocusContext.renderFocusContext
    default:
      throw new Error('unknown renderer')
  }
}

export const applyRender = (oldState: DialogState, newState: DialogState, diffResult: readonly number[]): readonly unknown[] => {
  const commands: unknown[] = []
  for (const item of diffResult) {
    const renderer = getRenderer(item)
    commands.push(renderer(oldState, newState))
  }
  return commands
}
