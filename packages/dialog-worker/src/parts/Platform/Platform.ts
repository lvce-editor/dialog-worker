import * as PlatformType from '../PlatformType/PlatformType.ts'

declare const PLATFORM: number | undefined

interface GlobalWithProcess {
  readonly process?: {
    readonly env?: {
      readonly NODE_ENV?: string
    }
  }
}

export const getPlatform = (): number => {
  if (typeof PLATFORM !== 'undefined') {
    return PLATFORM
  }
  const { process } = globalThis as GlobalWithProcess
  if (process?.env?.NODE_ENV === 'test') {
    return PlatformType.Test
  }
  if (typeof name !== 'undefined' && name.endsWith('(Electron)')) {
    return PlatformType.Electron
  }
  if (typeof name !== 'undefined' && name.endsWith('(Web)')) {
    return PlatformType.Web
  }
  return PlatformType.Remote
}
