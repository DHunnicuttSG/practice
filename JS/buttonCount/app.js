const PersonObj = {firstname: "John", lastname: "Doe", age:50, eyeColor:"blue"}

console.log(PersonObj.age)

const AnotherPerson = {
    firstname: "John", 
    lastname: "Doe", 
    age:50, 
    eyeColor:"blue"
}

class PersonDef {
    constructor(name, age) {
        this.name = name
        this.age = age
    }

    displayInfo() {
        return `Name: ${this.name}, Age: ${this.age}`
    }

}

const p1 = new PersonDef("jane", "34")

console.log(p1.name)

// function Person(first, last, age, eye) {
//     this.firstName = first;
//     this.lastName = last;
//     this.age = age;
//     this.eyeColor = eye;
//   }