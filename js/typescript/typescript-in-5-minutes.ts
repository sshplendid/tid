// 기존 자바스크립트 코드
function greeter(name) {
  return `Hello, ${name}`;
}

var user = 'Jane';

console.assert(greeter(user) === 'Hello, Jane', 'She is not Jane.');


// Type annotations
function greeter1(name: string) {
return `Hello, ${name}`;
}

console.assert(greeter1('Jim') == 'Hello, Jim', '\'Jim\' is not string');
//console.assert(greeter1(88) == 'Hello, 88', '88 is not string');


// Interfaces
interface Person {
  firstName: string;
  lastName: string;
}

function greeter2(guest: Person) {
  return `Hello, ${guest.firstName} ${guest.lastName}`;
}

var jessica = {firstName: 'Jessica', lastName: 'Jones'};
var thor = {firstName: 'Thor'};

console.assert(greeter2(jessica) === 'Hello, Jessica Jones', 'She is not Jessica!');
// console.assert(greeter2(thor) === 'Hello, Thor', 'He is not Thor!');


// Class
class Student {
  fullName: string;
  constructor(public firstName: string, public lastName: string) {
    this.fullName = firstName + ' ' + lastName;
  }
}

var luke = new Student('Luke', 'Cage');
console.assert(greeter2(luke) === 'Hello, Luke Cage', 'He is not Luke.');
