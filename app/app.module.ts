import { FullCalendarModule } from '@fullcalendar/angular'; // the main connector. must go first
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin
import interactionPlugin from '@fullcalendar/interaction';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {Injectable} from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import  {HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JwtModule } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
import { ACCESS_TOKEN_KEY, AuthService } from './services/auth.service';
import { AUTH_API_URL } from './app-injection-tokens';
import { AuthGuardService as AuthGuard } from './services/auth-guard.service';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { TokenInterceptorService } from './services/token-interceptor.service';
import {MatTabsModule} from '@angular/material/tabs';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import {MatListModule} from '@angular/material/list';
import { GroupComponent } from './components/group/group.component';
import { DialogsComponent } from './components/dialogs/dialogs.component';
import { DocumentsComponent } from './components/documents/documents.component';
import { SuperadminUsersComponent } from './components/superadmin-users/superadmin-users.component';
import { SuperadminGroupsComponent } from './components/superadmin-groups/superadmin-groups.component';


import { CalendarComponent } from './components/calendar/calendar.component';


FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  dayGridPlugin,
  interactionPlugin
]);

/*
@Injectable({providedIn: 'root'})
export class ServiceNameService {
  constructor() { }
  
};*/

export function tokenGetter(){
  return localStorage.getItem(ACCESS_TOKEN_KEY);
}

@NgModule({
  declarations: [			
    AppComponent,
    LoginComponent,
    HomeComponent,
    ToolbarComponent,
    SidenavComponent,
    GroupComponent,
    DialogsComponent,
    DocumentsComponent,
    SuperadminUsersComponent,
    SuperadminGroupsComponent,
    CalendarComponent
   ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    FlexLayoutModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    ReactiveFormsModule,
    MatTabsModule,
    MatCheckboxModule,
    MatSidenavModule,
    MatListModule,

    JwtModule.forRoot({
      config:{
        tokenGetter,
        allowedDomains: environment.tokenWhiteListedDomains
      }
    }),

    FullCalendarModule

  ],
  providers:[{
    provide: AUTH_API_URL,
    useValue: environment.authApi
  },
  AuthGuard,
  {
    provide: HTTP_INTERCEPTORS,
    multi: true,
    useClass: TokenInterceptorService
  }
],
  exports:[
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    CalendarComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
