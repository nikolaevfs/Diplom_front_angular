export class UserUpdate{
    firstName: string;
    lastName: string;
    username: string;
    email: string;

    constructor(firstName: string, lastName: string, username: string, email: string) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.username = username;
        this.email = email
    }
}