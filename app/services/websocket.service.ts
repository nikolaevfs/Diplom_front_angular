import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from } from 'rxjs';
import { baseUrl, environment } from 'src/environments/environment'
import { GroupMessage } from '../models/groupMessage';
import { ACCESS_TOKEN_KEY } from './auth.service';

declare var Stomp:any;
declare var SockJS:any;

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  stompClient: any = null;
  
  constructor(
    private http:HttpClient
  ) { }

  connect() {
    //this.disconnect();
    let socket = new SockJS(`${baseUrl}api/` + 'websocket');
    console.log(`${baseUrl}api/` + 'websocket')

    this.stompClient = Stomp.over(socket);
    let that = this;


    this.stompClient.connect({"Authorization": "Bearer_" + localStorage.getItem(ACCESS_TOKEN_KEY)}, function (frame:any) {
      console.log('Connected: ' + frame);
      that.stompClient.subscribe("/topic/newmessage", function (message: any){
        console.log(message);
      })
    });
  }

  disconnect() {
    if (this.stompClient !== null) {
      this.stompClient.disconnect();
      console.log("Disconnected");
    }
  }

  sendMessage(message: GroupMessage) {
    this.stompClient.send("/app/newMessage", {}, JSON.stringify(message));
}

}