import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Inject, Injectable} from '@angular/core';
import { User } from '../models/user';
import { Observable } from 'rxjs';
import { baseUrl } from 'src/environments/environment';
import { AUTH_API_URL } from '../app-injection-tokens';
import { ACCESS_TOKEN_KEY, AUTHENTICATED_USERNAME, AuthService } from './auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Group } from '../models/group';
import { GroupEvent } from '../models/event';
import { tap } from 'rxjs/operators';
import { UserUpdate } from '../models/userupdate';

@Injectable({
    providedIn: 'root'
})

class RestapiService{
    constructor(
        private http:HttpClient,
        @Inject(AUTH_API_URL) private apiUrl:string,
        private jwtHelper:JwtHelperService,
        private authService: AuthService
        ){ }

    getStudentByUsername(username: string): Observable<User>{      
        return this.http.get<User>(`${baseUrl}api/user/`+ username);
    }

    getAllGroups(): Observable<Array<string>>{
        return this.http.get<Array<string>>(`${baseUrl}api/login`);
    }

    getNumOfRoles(username: String): Observable<number>{
        return this.http.get<number>(`${baseUrl}api/user/roles/`+username);
    }

    getStudentsInGroup(): Observable<User[]>{
        return this.http.get<User[]>(`${baseUrl}api/group/students/`+ localStorage.getItem(AUTHENTICATED_USERNAME));
    }

    getStudentsInGroupForAccept(): Observable<User[]>{
        return this.http.get<User[]>(`${baseUrl}api/admin/accepting/`+ localStorage.getItem(AUTHENTICATED_USERNAME));
    }

    getStudents(): Observable<User[]>{
        return this.http.get<User[]>(`${baseUrl}api/superadmin/allusers`);
    }

    getSomeStudents(username:string): Observable<User[]>{
        if(username==""){
            return this.getStudents();
        }
        return this.http.get<User[]>(`${baseUrl}api/superadmin/students/` + username);
    }

    getGroups(): Observable<Group[]>{
        console.log("getting groups")
        return this.http.get<Group[]>(`${baseUrl}api/superadmin/allgroups`);
    }

    getSomeGroups(name: string): Observable<Group[]>{
        if(name==""){
            return this.getGroups();
        }
        return this.http.get<Group[]>(`${baseUrl}api/superadmin/groups/`+ name);
    }


    deleteStudent(username: string): void{
        console.log("try to delete");
        this.http.delete(`${baseUrl}api/user/delete/`+ username).toPromise().then(data =>{
            console.log("deleted");
        });
    }

    deleteGroup(name: string): void{
        console.log("try to delete group");
        this.http.delete(`${baseUrl}api/superadmin/deletegroup/`+ name).toPromise().then(data =>{
            console.log("deleted");
        });
    }

    acceptUser(username: string): Observable<User[]>{
        return this.http.get<User[]>(`${baseUrl}api/admin/accept/`+ username);
    }

    getGroupEvents(username: string):Observable<GroupEvent[]>{
        return this.http.get<GroupEvent[]>(`${baseUrl}api/group/events/`+ username);
    }

    addGroupEvent( data:GroupEvent){
        return this.http.post<GroupEvent[]>(`${baseUrl}api/group/events/add/`+ localStorage.getItem(AUTHENTICATED_USERNAME), data);
    }

    updateUser(user: UserUpdate): Observable<User>{
        return this.http.patch<User>(`${baseUrl}api/user/update/`+ localStorage.getItem(AUTHENTICATED_USERNAME),user);
    }
    
}


export {RestapiService};

