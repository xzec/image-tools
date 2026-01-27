export {}

interface EyeDropperResult {
  sRGBHex: string
}

interface EyeDropperOpenOptions {
  signal?: AbortSignal
}

type EyeDropperConstructor = new () => {
  open(options?: EyeDropperOpenOptions): Promise<EyeDropperResult>
}

declare global {
  interface Window {
    EyeDropper: EyeDropperConstructor
  }
}
