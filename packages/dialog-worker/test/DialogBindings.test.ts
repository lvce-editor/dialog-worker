import { expect, test } from '@jest/globals'
import * as CommandMap from '../src/parts/CommandMap/CommandMap.ts'
import * as GetKeyBindings from '../src/parts/GetKeyBindings/GetKeyBindings.ts'
import * as RenderEventListeners from '../src/parts/RenderEventListeners/RenderEventListeners.ts'

test('exposes dialog commands', () => {
  expect(Object.keys(CommandMap.commandMap).filter((key) => key.startsWith('Dialog.'))).toEqual([
    'Dialog.create',
    'Dialog.diff2',
    'Dialog.dispose',
    'Dialog.getCommandIds',
    'Dialog.getKeyBindings',
    'Dialog.handleClickButton',
    'Dialog.handleClickClose',
    'Dialog.handleFocusIn',
    'Dialog.loadContent2',
    'Dialog.render2',
    'Dialog.renderEventListeners',
    'Dialog.show',
    'Dialog.showWarning',
  ])
})

test('provides escape key binding', () => {
  expect(GetKeyBindings.getKeyBindings()).toEqual([
    {
      command: 'Dialog.handleClickClose',
      key: 8,
      when: 7,
    },
  ])
})

test('provides dialog event listeners', () => {
  expect(RenderEventListeners.renderEventListeners()).toEqual([
    {
      name: 2,
      params: ['handleClickButton', 'event.target.name'],
    },
    {
      name: 1,
      params: ['handleClickClose'],
    },
    {
      name: 3,
      params: ['handleFocusIn'],
    },
    {
      name: 4,
      params: [],
      preventDefault: true,
    },
  ])
})
