
export class Token {
    username: string;
    token: string;
    firstName:string;
    lastName:string;
    expiresAt:number;

    constructor(username: string, token: string, firstName:string, lastName:string, expiresAt:number) {
 
        this.username = username;
        this.token = token;
        this.firstName = firstName;
        this.lastName = lastName;
        this.expiresAt=expiresAt;
        
    }
}
