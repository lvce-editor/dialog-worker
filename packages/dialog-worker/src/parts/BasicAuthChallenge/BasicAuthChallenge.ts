export interface BasicAuthChallenge {
  readonly host: string
  readonly isProxy: boolean
  readonly port: number
  readonly realm: string
  readonly requestId: string
  readonly scheme: string
  readonly url: string
}
