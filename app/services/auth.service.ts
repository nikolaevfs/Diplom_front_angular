import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { baseUrl } from 'src/environments/environment';
import { AUTH_API_URL } from '../app-injection-tokens';
import { Token } from '../models/token';
import { tap } from 'rxjs/operators';
import { User } from '../models/user';
import { UserReg } from '../models/userreg';
import { RestapiService } from './restapi.service';
import { GroupEvent } from '../models/event';

export const ACCESS_TOKEN_KEY = "access";
export const AUTHENTICATED_USERNAME = "username";
export const AUTHENTICATED_FIRST = "first";
export const AUTHENTICATED_LAST = "last";
export const AUTHENTICATED_GROUPNAME = "group";
export const IS_ADMIN = "false";
export const TOKEN_EXPIRED="";
//export const EVENTS:GroupEvent[] = [{title:"",start: new Date("2021-05-28"), end: new Date("2021-05-30")}];



@Injectable({
  providedIn: 'root'
})
export class AuthService{

  constructor(
    private http:HttpClient,
    @Inject(AUTH_API_URL) private apiUrl:string,
    private jwtHelper:JwtHelperService,
    private router: Router
    ) { }

  login(data: any): Observable<Token>{
    return this.http.post<Token>(`${baseUrl}api/login`, data)
    .pipe(
      tap(token => {
        localStorage.setItem(ACCESS_TOKEN_KEY, token.token);
        localStorage.setItem(AUTHENTICATED_USERNAME, token.username);
        localStorage.setItem(AUTHENTICATED_FIRST, token.firstName);
        localStorage.setItem(AUTHENTICATED_LAST, token.lastName);
        localStorage.setItem(TOKEN_EXPIRED, ((Date.now())+token.expiresAt).toString());
        console.log((Date.now())+token.expiresAt);
        console.log(Date.now());
      })
    );
  }

  isAuthenticated(): boolean{
    var token = localStorage.getItem(ACCESS_TOKEN_KEY);

    if(token == null){
        return false;
    }
    return true; 
  }

  logout(): void{
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(AUTHENTICATED_USERNAME);
    this.router.navigate(['']);    
  }

  getJwtToken(){
    return localStorage.getItem(ACCESS_TOKEN_KEY);
  }


  registration(data: UserReg){
    console.log(data);

    this.http.post(`${baseUrl}api/registration/user`, data)
    .toPromise().then(data =>{
      console.log("sent");
      this.router.navigate(['']);
    });
  }

  registrationAdmin(data: UserReg){
    console.log(data);

    this.http.post(`${baseUrl}api/registration/admin`, data)
    .toPromise().then(data =>{
      console.log("sent");
      this.router.navigate(['']);
    });
  }


}


