import { Group } from "./group";

export class User{
    //id: bigint;
    firstName: string;
    lastName: string;
    username: string;
    group: Group;
    imageURL: string;
    password: string;
    email: string;

    constructor(/*id: bigint,*/ firstName: string, lastName: string, username: string, group: Group, imageURL: string, password: string, email: string) {
        //this.id =  id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.username = username;
        this.group = group;
        this.imageURL = imageURL;
        this.password = password;
        this.email = email
    }
}