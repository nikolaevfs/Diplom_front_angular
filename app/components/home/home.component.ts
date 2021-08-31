import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AUTH_API_URL } from 'src/app/app-injection-tokens';
import { GroupEvent } from 'src/app/models/event';
import { User } from 'src/app/models/user';
import { UserUpdate } from 'src/app/models/userupdate';
import { ACCESS_TOKEN_KEY, AUTHENTICATED_USERNAME, AuthService, IS_ADMIN } from '../../services/auth.service';
import { RestapiService } from '../../services/restapi.service';
import { CalendarComponent } from '../calendar/calendar.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @ViewChild(CalendarComponent) calendar!:CalendarComponent;

  constructor(   
    private authService: AuthService,
    private router: Router,
    private restapiService: RestapiService
    ) { 
    }

    formGroupEvent: FormGroup = new FormGroup({
      title:new FormControl(''),
      start:new FormControl(Date),
      end: new FormControl(Date)
    });


    formUpdateUser: FormGroup = new FormGroup({
      firstName:new FormControl(''),
      lastName:new FormControl(''),
      username: new FormControl(''),
      email: new FormControl('')
    });

  firstTime:boolean = true
  adding: boolean = false
  updating:boolean = false

  user!: User;
  admin: boolean=false;
  roles!:number;

  ngOnInit() {
    console.log("init")
    var username = localStorage.getItem(AUTHENTICATED_USERNAME)!; // does not allows null

    this.restapiService.getStudentByUsername(username).subscribe((data: User) => {
      this.user=data;
      console.log(this.user);
      console.log(Date.now())
      return data;
    });


    if(this.firstTime){
      this.firstTime=false;
      this.restapiService.getNumOfRoles(username).subscribe(data =>{
        this.roles=data;
        if(this.roles==2){
          this.admin=true;
          localStorage.setItem(IS_ADMIN,"true");
        }else{
          localStorage.setItem(IS_ADMIN, "false");
        }
  
        return data;
      });
    }

  }

  
  getStudent(){
    var username = localStorage.getItem(AUTHENTICATED_USERNAME)!; // does not allows null

    this.restapiService.getStudentByUsername(username).subscribe(data => {
      return data;
    }
    );
  }

  viewAdding(){
    this.adding=true
  }

  viewUpdating(){
    console.log("view")
    this.updating=true
  }

  back(){
    this.updating=false
    this.adding=false
  }

  addEvent(){
    var event = new GroupEvent(this.formGroupEvent.get("title")?.value, this.formGroupEvent.get("start")?.value, this.formGroupEvent.get("end")?.value)
    this.restapiService.addGroupEvent(event).subscribe(data=>{
      this.calendar.events = data;
      this.calendar.ngOnInit();
      console.log("events from home");
    }

    );
    this.adding=false;
  }

  updateData(){
    var updated = new UserUpdate(this.formUpdateUser.get("firstName")?.value, this.formUpdateUser.get("lastName")?.value,
    this.formUpdateUser.get("username")?.value, this.formUpdateUser.get("email")?.value)
    this.restapiService.updateUser(updated).subscribe(data=>{
      this.user = data;
      return data;
    });
    localStorage.setItem(AUTHENTICATED_USERNAME, this.formUpdateUser.get("username")?.value);


    this.updating=false;
  }

}
