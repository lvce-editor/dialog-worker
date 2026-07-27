import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'

export const text = (value: string): VirtualDomNode => {
  return {
    childCount: 0,
    text: value,
    type: VirtualDomElements.Text,
  }
}
