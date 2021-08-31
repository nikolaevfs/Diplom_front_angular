import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AUTHENTICATED_FIRST, AUTHENTICATED_USERNAME } from './auth.service';
import { baseUrl } from 'src/environments/environment';
import { GroupMessage } from '../models/groupMessage';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  messages!: GroupMessage[];


constructor(
  private http:HttpClient
  ) { }

sendMessage(text: string) {
  const timeSent = new Date();


var data = new GroupMessage(localStorage.getItem(AUTHENTICATED_FIRST)!, localStorage.getItem(AUTHENTICATED_FIRST)!, localStorage.getItem(AUTHENTICATED_USERNAME)!, text, timeSent)

  return this.http.post(`${baseUrl}api/dialogs/group/add`, data).toPromise().then(data=>{}
  );
}

getMessages(): Observable<GroupMessage[]>{
  return this.http.get<GroupMessage[]>(`${baseUrl}api/dialogs/group/` + localStorage.getItem(AUTHENTICATED_USERNAME));
}


}
