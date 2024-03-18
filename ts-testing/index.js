"use strict";
let age = 20;
let fullName = "John Doe";
let isOfAge = true;
let something = 3;
something = "Hello";
let teams = ["Lakers", "Warriors", "Celtics"];
let address = ["123 Main St", "456 Elm St"];
let greeting = "hello";
let somethingElse = greeting; // any will overwrite the type so dont use it. We are demanding a number type but it will still return a string
const setUser = (id, name, adminKey) => {
    return {
        id: id,
        name: name,
        adminKey: adminKey ? adminKey : false
    };
};
const user = setUser(3, "John Doe");
const users = [{ id: 3, name: "John Doe", adminKey: false }, { id: 4, name: "Jane Doe", adminKey: true }, { id: 5, name: "sara", }];
class Person {
    constructor(name) {
        this.name = name;
    }
}
const peter = new Person("Peter");
