import { expect, test } from '@jest/globals'
import * as ConfirmPromptStrings from '../src/parts/ConfirmPromptStrings/ConfirmPromptStrings.ts'

test('cancel', () => {
  expect(ConfirmPromptStrings.cancel()).toBe('Cancel')
})

test('ok', () => {
  expect(ConfirmPromptStrings.ok()).toBe('Ok')
})
