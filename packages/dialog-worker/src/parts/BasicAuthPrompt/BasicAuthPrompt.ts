import type { BasicAuthChallenge } from '../BasicAuthChallenge/BasicAuthChallenge.ts'
import type { DialogOptions } from '../DialogOptions/DialogOptions.ts'
import * as ShowDialog from '../ShowDialog/ShowDialog.ts'

export type { BasicAuthChallenge } from '../BasicAuthChallenge/BasicAuthChallenge.ts'

const getAuthority = ({ host, port, url }: BasicAuthChallenge): string => {
  const protocol = new URL(url).protocol
  const defaultPort = protocol === 'https:' ? 443 : 80
  return port === defaultPort ? host : `${host}:${port}`
}

const getMessage = (challenge: BasicAuthChallenge): string => {
  const authority = getAuthority(challenge)
  if (challenge.realm) {
    return `${authority} is requesting your username and password. Realm: ${challenge.realm}`
  }
  return `${authority} is requesting your username and password.`
}

export const show = async (challenge: BasicAuthChallenge): Promise<void> => {
  const options: DialogOptions = {
    closeMessage: 'Cancel',
    confirmMessage: 'Sign In',
    kind: 'basic-auth',
    message: getMessage(challenge),
    requestId: challenge.requestId,
    title: challenge.isProxy ? 'Proxy Authentication Required' : 'Authentication Required',
  }
  await ShowDialog.showDialog(options)
}
