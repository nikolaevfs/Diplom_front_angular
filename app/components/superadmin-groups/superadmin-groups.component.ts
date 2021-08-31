import { Component, OnInit } from '@angular/core';
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, switchMap } from 'rxjs/operators';
import { Group } from 'src/app/models/group';
import { User } from 'src/app/models/user';
import { RestapiService } from 'src/app/services/restapi.service';

@Component({
  selector: 'app-superadmin-groups',
  templateUrl: './superadmin-groups.component.html',
  styleUrls: ['./superadmin-groups.component.css']
})
export class SuperadminGroupsComponent implements OnInit {



    groups!: Group[];
  constructor(
    private restapiService: RestapiService
  ) { }

  ngOnInit() {
    this.restapiService.getGroups().subscribe((data: Group[]) => {
      this.groups=data;
      return data;
    });


    const search = document.getElementById('search')!

    const stream$ = fromEvent(search, 'input')
    .pipe(
      map(e => (<HTMLInputElement>e.target).value),
      debounceTime(500),
      distinctUntilChanged(),
      switchMap(v=> this.restapiService.getSomeGroups(v))
    )

    stream$.subscribe(value=>{
        this.groups=value;
    })


  }

  deleteGroup(group: Group){
    this.groups.forEach((value,index)=>{
      if(value == group)
      this.groups.splice(index,1);
    })
    this.restapiService.deleteGroup(group.name);
  }
}
