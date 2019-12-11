interface Person {
  firstName: string,
  lastName: string
}
function greeter(person: Person) {
  return `Hello ${person.firstName} ${person.lastName}`
}

class User {
  firstName: string
  lastName: string
  fullName: string
  constructor(firstName: string, lastName: string) {
    this.firstName = firstName
    this.lastName = lastName
    this.fullName = `${firstName} ${lastName}`
  }
}
const user = new User('Ling', 'Yu')
console.log(greeter(user))