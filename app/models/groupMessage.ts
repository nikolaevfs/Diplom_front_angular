export class GroupMessage{

    firstName:string;
    lastName: string;
    username: string;
    text: string;
    timeSent: Date;

    constructor(firstName: string, lastName: string, username: string, text: string, timeSent:Date) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.username = username;
        this.text = text;
        this.timeSent = timeSent;
    }
}