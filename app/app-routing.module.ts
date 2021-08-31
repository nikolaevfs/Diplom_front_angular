import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuardService as AuthGuard } from './services/auth-guard.service';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { GroupComponent } from './components/group/group.component';
import { DialogsComponent } from './components/dialogs/dialogs.component';
import { DocumentsComponent } from './components/documents/documents.component';
import { SuperadminUsersComponent } from './components/superadmin-users/superadmin-users.component';
import { SuperadminGroupsComponent } from './components/superadmin-groups/superadmin-groups.component';
import { CalendarComponent } from './components/calendar/calendar.component';


const routes: Routes= [
  {path:'', component:LoginComponent},

  { path:'home', component:HomeComponent, canActivate: [AuthGuard]},
  { path:'home', component:ToolbarComponent, canActivate: [AuthGuard]},
  { path:'home', component:CalendarComponent, canActivate: [AuthGuard]},

  { path:'group', component:GroupComponent, canActivate: [AuthGuard]},
  { path:'group', component:ToolbarComponent, canActivate: [AuthGuard]},

  { path:'dialogs', component:DialogsComponent, canActivate: [AuthGuard]},
  { path:'dialogs', component:ToolbarComponent, canActivate: [AuthGuard]},
  
  { path:'documents', component:DocumentsComponent, canActivate: [AuthGuard]},
  { path:'documents', component:ToolbarComponent, canActivate: [AuthGuard]},


  { path:'adminusers', component:SuperadminUsersComponent, canActivate: [AuthGuard]},
  { path:'adminusers', component:ToolbarComponent, canActivate: [AuthGuard]},

  { path:'admingroups', component:SuperadminGroupsComponent, canActivate: [AuthGuard]},
  { path:'admingroups', component:ToolbarComponent, canActivate: [AuthGuard]},



  { path: '**', redirectTo: '' }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
