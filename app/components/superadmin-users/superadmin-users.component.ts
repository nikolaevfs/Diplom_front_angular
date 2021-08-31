import { Component, OnInit, ViewChild } from '@angular/core';
import { EMPTY, fromEvent } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, filter, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { User } from 'src/app/models/user';
import { RestapiService } from 'src/app/services/restapi.service';
import {ajax} from 'rxjs/ajax'
import { baseUrl } from 'src/environments/environment';
import { AfterViewInit } from '@angular/core';
import { ElementRef } from '@angular/core';

@Component({
  selector: 'app-superadmin-users',
  templateUrl: './superadmin-users.component.html',
  styleUrls: ['./superadmin-users.component.css']
})
export class SuperadminUsersComponent implements OnInit{

  //search!: HTMLElement
  students!: User[];
  constructor(
    private restapiService: RestapiService
  ) { }

  //@ViewChild('search', { read: ElementRef }) searchInput: ElementRef | undefined;



  ngOnInit() {
    this.restapiService.getStudents().subscribe((data: User[]) => {
      this.students=data;
      return data;
    });

    const search = document.getElementById('search')!

    const stream$ = fromEvent(search, 'input')
    .pipe(
      map(e => (<HTMLInputElement>e.target).value),
      debounceTime(500),
      distinctUntilChanged(),
      switchMap(v=> this.restapiService.getSomeStudents(v))
    )

    stream$.subscribe(value=>{
        console.log(value);
        this.students=value;
    })
  }

  deleteUser(user: User){
    this.students.forEach((value,index)=>{
      if(value == user)
      this.students.splice(index,1);
    })
    this.restapiService.deleteStudent(user.username);
  }
}
