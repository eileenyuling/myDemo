let isDone: boolean = false
let decLiteral: number = 20
let hexLiteral: number = 0x14
let str: string = 'ling'
enum Color {
  Red, Green, Blue
}
// declare function create(o: object | null): void
// create({num: 1})

type C = {
  a: string,
  b?: number
}
function f({a, b = 0} = {a: ''}): void {
  console.log(a)
}
f({a:'1', b: 3})
