function greeter(person) {
    return "Hello " + person.firstName + " " + person.lastName;
}
var user = {
    firstName: 'Yee',
    lastName: 'Wang'
};
console.log(greeter(user));
