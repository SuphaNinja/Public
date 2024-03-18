let age: number = 20;
let fullName: string = "John Doe";
let isOfAge: boolean = true;
let something: any = 3;

something = "Hello";

let teams: string[] = ["Lakers", "Warriors", "Celtics"];
let address: string | string[] = ["123 Main St", "456 Elm St"]; 

let greeting: any ="hello";
let somethingElse: number = <number>greeting; // any will overwrite the type so dont use it. We are demanding a number type but it will still return a string


type User = {
    id: number,
    name: string,
    adminKey?: boolean
};

const setUser = (id: number, name: string, adminKey?: boolean | undefined): User => {
    return{
        id: id,
        name: name,
        adminKey: adminKey ? adminKey : false
    };
};
const user: User = setUser(3 , "John Doe", );

const users: User[] = [{ id: 3, name: "John Doe", adminKey: false}, { id: 4, name: "Jane Doe", adminKey: true}, { id: 5, name: "sara",  } ];

interface iName {
    name: string
}

class Person implements iName{
    name: string

    constructor (name: string){
        this.name = name;
    }
}

const peter = new Person("Peter");
console.log(users)