// eslint-disable-next-line @typescript-eslint/ban-types
export const debounce = (fn: Function, ms = 300): Function => {
  let timeoutId: ReturnType<typeof setTimeout>
  return function (this: unknown, ...args: unknown[]) {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => fn.apply(this, args), ms)
  }
}
