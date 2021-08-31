
export class UserReg{
    firstName: string;
    lastName: string;
    username: string;
    groupName: string;
    imageURL: string;
    password: string;
    email: string;

    constructor(firstName: string, lastName: string, username: string, groupName: string, imageURL: string, password: string, email: string) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.username = username;
        this.groupName = groupName;
        this.imageURL = imageURL;
        this.password = password;
        this.email = email
    }
}