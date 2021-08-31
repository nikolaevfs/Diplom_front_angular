export class GroupEvent{
   // id: number;
    title:string;
   // description: string;
    start: Date;
    end: Date;



    constructor(/*id:number,*/ title: string, /*description: string,*/ start:Date, end:Date) {

        this.title=title;
        this.start=start;
        this.end=end;
        
    }
}