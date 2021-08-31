import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { IS_ADMIN } from 'src/app/services/auth.service';
import { RestapiService } from 'src/app/services/restapi.service';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {

students!: User[];
studentsForAccept!: User[];
admin=localStorage.getItem(IS_ADMIN);


  constructor(
    private restapiService: RestapiService,
  ) { }

  ngOnInit() {
    this.restapiService.getStudentsInGroup().subscribe((data: User[]) => {
      this.students=data;
      return data;
    });
  console.log(this.admin)
    if(this.admin=="true"){

      this.restapiService.getStudentsInGroupForAccept().subscribe((data: User[]) => {
        this.studentsForAccept=data;
        console.log(this.studentsForAccept);
        return data;
      });
    }

  }

  deleteUser(student: User){
    this.students.forEach((value,index)=>{
      if(value == student)
      this.students.splice(index,1);
    })
    this.restapiService.deleteStudent(student.username);
  }

  deleteRequest(student: User){
    console.log(student);
    this.studentsForAccept.forEach((value,index)=>{
      if(value == student)
      this.studentsForAccept.splice(index,1);
    })
    this.restapiService.deleteStudent(student.username);
  }

  acceptUser(student: User){
    
    console.log(student);
    this.studentsForAccept.forEach((value,index)=>{
      if(value == student)
      this.studentsForAccept.splice(index,1);
    })

    this.restapiService.acceptUser(student.username).subscribe((data:User[]) => {
      this.students = data;
      return data;
    });
  }
}
