class Person {
  constructor(name = "Anonymous", age = 0) {
    this.name = name;
    this.age = age;
  }
  getGreeting() {
    return `Hi. I am ${this.name}!`;
  }
  getDesciption() {
    return `My name is ${this.name}. I am ${this.age} year(s) old.`;
  }
}

class Student extends Person {
  constructor(name, age, major) {
    super(name, age);
    this.major = major;
  }
  hasMajor() {
    return !!this.major;
  }
  getDesciption() {
    let description = super.getDesciption();
    if (this.hasMajor()) {
      description += ` My major is ${this.major}.`;
    }
    return description;
  }
}

const me = new Student("pankaj", 26, "Computers");
const me2 = new Student("Jaby", 29);
console.log(me.getDesciption());
console.log(me2.major);

class Traveler extends Person {
  constructor(name, age, homeLocation) {
    super(name, age);
    this.homeLocation = homeLocation;
  }
  getGreeting() {
    let greeting = super.getGreeting();
    if (this.homeLocation) {
      greeting += ` My home location is ${this.homeLocation}.`;
    }
    return greeting;
  }
}
const travelorMe = new Traveler("Pankaj", 27);
console.log(travelorMe.getGreeting());
const template = (
  <div>
    <h1>ES6 Class</h1>
  </div>
);

ReactDOM.render(template, document.getElementById("app"));
