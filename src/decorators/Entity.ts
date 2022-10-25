export const Entity = (constructor: Function) => {
  constructor.prototype.id = BigInt(0)
}

export function Entity2<T extends { new (...args: any[]): {} }>(
  constructor: T
) {
  return class extends constructor {
    id: bigint = BigInt(0)
  }
}
