export interface ElectronMessageBoxOptions {
  readonly buttons?: readonly string[]
  readonly defaultId?: number
  readonly detail?: string
  readonly message: string
  readonly title?: string
  readonly type?: string
}
