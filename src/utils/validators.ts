export function isPositiveNumber(message: string) {
  return (_: any, value: unknown, callback: (error?: Error) => any) => {
    if (typeof value === 'number' && value > 0) {
      callback()
    }
    else {
      callback(new Error(message))
    }
  }
}
