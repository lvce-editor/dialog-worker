import { beforeEach, expect, test } from '@jest/globals'
import type { DialogState } from '../src/parts/DialogState/DialogState.ts'
import * as ApplyRender from '../src/parts/ApplyRender/ApplyRender.ts'
import * as Create from '../src/parts/Create/Create.ts'
import * as DialogStates from '../src/parts/DialogStates/DialogStates.ts'
import * as Diff2 from '../src/parts/Diff2/Diff2.ts'
import * as Dispose from '../src/parts/Dispose/Dispose.ts'
import * as GetDialogIconVirtualDom from '../src/parts/GetDialogIconVirtualDom/GetDialogIconVirtualDom.ts'
import * as GetFocusSelector from '../src/parts/GetFocusSelector/GetFocusSelector.ts'
import * as LoadContent2 from '../src/parts/LoadContent2/LoadContent2.ts'
import * as Render2 from '../src/parts/Render2/Render2.ts'

beforeEach(() => {
  DialogStates.clear()
})

test('creates, loads, diffs, and renders a warning dialog', async () => {
  const uid = 42
  Create.create(uid)
  const loadContent = DialogStates.wrapAsyncCommand(LoadContent2.loadContent2)
  await loadContent(uid, {
    message: "Your browser doesn't support opening local folders.",
    title: 'Opening Local Folders is Unsupported',
    type: 'warning',
  })

  expect(DialogStates.get(uid).newState).toEqual({
    closeMessage: 'Cancel',
    confirmMessage: 'Ok',
    focusId: 1,
    message: "Your browser doesn't support opening local folders.",
    title: 'Opening Local Folders is Unsupported',
    type: 'warning',
    uid,
  })

  const diffResult = Diff2.diff2(uid)
  expect(diffResult).toEqual([3, 2, 4])

  const commands = Render2.render2(uid, diffResult)
  expect(commands).toEqual([
    [
      'Viewlet.setDom2',
      [
        {
          childCount: 1,
          className: 'Viewlet DialogOverlay',
          onContextMenu: 4,
          type: 4,
        },
        {
          ariaLabelledBy: 'DialogIcon DialogHeading',
          ariaModal: 'true',
          childCount: 3,
          className: 'DialogContent',
          onFocusIn: 3,
          role: 'dialog',
          tabIndex: -1,
          type: 4,
        },
        {
          childCount: 1,
          className: 'DialogToolBarRow',
          type: 4,
        },
        {
          ariaLabel: 'Cancel',
          childCount: 1,
          className: 'DialogClose',
          onClick: 1,
          type: 1,
        },
        {
          childCount: 0,
          className: 'MaskIcon MaskIconClose',
          type: 4,
        },
        {
          childCount: 2,
          className: 'DialogMessageRow',
          type: 4,
        },
        {
          ariaLabel: 'Warning',
          childCount: 0,
          className: 'DialogIcon DialogWarningIcon MaskIcon MaskIconWarning',
          id: 'DialogIcon',
          type: 4,
        },
        {
          childCount: 2,
          className: 'DialogContentRight',
          type: 4,
        },
        {
          childCount: 1,
          className: 'DialogHeading',
          id: 'DialogHeading',
          type: 4,
        },
        {
          childCount: 0,
          text: 'Opening Local Folders is Unsupported',
          type: 12,
        },
        {
          childCount: 1,
          className: 'DialogMessage',
          type: 4,
        },
        {
          childCount: 0,
          text: "Your browser doesn't support opening local folders.",
          type: 12,
        },
        {
          childCount: 1,
          className: 'DialogButtonsRow',
          type: 4,
        },
        {
          childCount: 1,
          className: 'Button ButtonPrimary',
          name: 'Confirm',
          onClick: 2,
          type: 1,
        },
        {
          childCount: 0,
          text: 'Ok',
          type: 12,
        },
      ],
    ],
    ['Viewlet.focusSelector', '[name="Confirm"]'],
    ['Viewlet.setFocusContext', 7],
  ])
  expect(Diff2.diff2(uid)).toEqual([])
})

test('supports custom labels and defaults to an info dialog', async () => {
  const uid = 43
  Create.create(uid)
  const loadContent = DialogStates.wrapAsyncCommand(LoadContent2.loadContent2)
  await loadContent(uid, {
    closeMessage: 'Dismiss',
    confirmMessage: 'Continue',
    message: 'Trust this extension?',
    title: 'Extension Trust',
  })
  expect(DialogStates.get(uid).newState).toMatchObject({
    closeMessage: 'Dismiss',
    confirmMessage: 'Continue',
    type: 'info',
  })
})

test('renders all icon types', () => {
  expect(GetDialogIconVirtualDom.getDialogIconVirtualDom('error')).toMatchObject({
    ariaLabel: 'Error',
    className: 'DialogIcon DialogErrorIcon MaskIcon MaskIconError',
  })
  expect(GetDialogIconVirtualDom.getDialogIconVirtualDom('info')).toMatchObject({
    ariaLabel: 'Info',
    className: 'DialogIcon DialogInfoIcon MaskIcon MaskIconInfo',
  })
  expect(GetDialogIconVirtualDom.getDialogIconVirtualDom('warning')).toMatchObject({
    ariaLabel: 'Warning',
    className: 'DialogIcon DialogWarningIcon MaskIcon MaskIconWarning',
  })
})

test('returns an empty focus selector for an unknown focus id', () => {
  expect(GetFocusSelector.getFocusSelector(0)).toBe('')
})

test('rejects an unknown render type', () => {
  const state: DialogState = {
    closeMessage: 'Cancel',
    confirmMessage: 'Ok',
    focusId: 1,
    message: 'Message',
    title: 'Title',
    type: 'info',
    uid: 1,
  }
  expect(() => ApplyRender.applyRender(state, state, [999])).toThrow(new Error('unknown renderer'))
})

test('disposes dialog state', () => {
  Create.create(44)
  Dispose.dispose(44)
  expect(DialogStates.get(44)).toBeUndefined()
})
