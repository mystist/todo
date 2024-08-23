export const classNames = (...classes: string[]) => {
  return classes.filter(Boolean).join(' ')
}

export const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))
