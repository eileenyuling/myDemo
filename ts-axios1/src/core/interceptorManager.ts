import { ResolvedFn, RejectedFn } from "../types"

interface Interceptor<T> {
  resolved: ResolvedFn<T>,
  rejected?: RejectedFn
}
export default class InterceptorManager<T> {
  private intercetors: Array<Interceptor<T>  | null>
  constructor() {
    this.intercetors = []
  }
  use(resolved: ResolvedFn<T>, rejected?: RejectedFn): number {
    this.intercetors.push({
      resolved,
      rejected
    })
    return this.intercetors.length - 1
  }

  forEach(fn: (interceptor: Interceptor<T>) => void): void {
    this.intercetors.forEach(interceptor => {
      if (interceptor !== null) {
        fn(interceptor)
      }
    })
  }
  eject(id: number): void {
    if (this.intercetors[id]) {
      this.intercetors[id] = null
    }
  }
}
