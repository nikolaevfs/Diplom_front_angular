import { HttpClient } from '@angular/common/http';
import { Component, OnChanges, OnInit} from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular';
import { GroupEvent } from 'src/app/models/event';
import { AUTHENTICATED_USERNAME } from 'src/app/services/auth.service';
import { RestapiService } from 'src/app/services/restapi.service';
import { baseUrl } from 'src/environments/environment';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

events!:GroupEvent[];
dat!:GroupEvent[];

constructor(
    private restapiService: RestapiService,
    private http: HttpClient
  ) {}

  ngOnInit(){
    console.log("calendar init");
    this.restapiService.getGroupEvents(localStorage.getItem(AUTHENTICATED_USERNAME)!).subscribe((data:GroupEvent[]) => {
      this.events = data;
      this.calendarOptions.events=this.events;
      return data;
    });
  }


  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    events: this.events,
    
  };

}