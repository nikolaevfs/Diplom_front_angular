import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AUTHENTICATED_USERNAME, AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { RestapiService } from 'src/app/services/restapi.service';
import { Group } from 'src/app/models/group';
import { UserReg } from 'src/app/models/userreg';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formGroup: FormGroup = new FormGroup({
    username:new FormControl(''),
    password:new FormControl('')
  });


  checkBoxValue: boolean = false;
  registerAdmin: boolean = false;
  groupNames!:string[];
  

  formGroupReg: FormGroup = new FormGroup({
    username:new FormControl(''),
    firstName:new FormControl(''),
    lastName:new FormControl(''),
    studentGroup:new FormControl(''),
    email:new FormControl(''),
    password:new FormControl(''),
    password2:new FormControl('')
  });

  userReg!: UserReg

  //error:any;

  constructor(
    private authService: AuthService,
    private restapiService: RestapiService,
    private router: Router
    ) { }


  ngOnInit() {
    this.authService.logout();


    this.restapiService.getAllGroups().subscribe(res=>{
      this.groupNames=res;
    });
  }


  changedRegister(){
    
  }


  loginProcess(){
    if(this.formGroup.valid){
      this.authService.login(this.formGroup.value).subscribe(res => {
        if(this.authService.isAuthenticated()){
          if(res.username=="superadmin"){
            this.router.navigate(['adminusers']);
          }else{
            this.router.navigate(['home']);
          }
         
        }
      },          
      error => {alert('Wrong login or passwod')})
    }
  }


  registrationProcess(){

    if(this.formGroupReg.valid){

      if(this.checkBoxValue){
        var user = new UserReg(this.formGroupReg.get("firstName")?.value, this.formGroupReg.get("lastName")?.value,
        this.formGroupReg.get("username")?.value,this.formGroupReg.get("studentGroup")?.value, "",
        this.formGroupReg.get("password")?.value, this.formGroupReg.get("email")?.value);

        this.authService.registrationAdmin(user);
        alert("registered");
        location.reload();
      }else{
        var user = new UserReg(this.formGroupReg.get("firstName")?.value, this.formGroupReg.get("lastName")?.value,
        this.formGroupReg.get("username")?.value, this.formGroupReg.get("studentGroup")?.value, "",
        this.formGroupReg.get("password")?.value, this.formGroupReg.get("email")?.value);


        this.authService.registration(user);
        alert("registered");
        location.reload();
      }
    }
  }
}
