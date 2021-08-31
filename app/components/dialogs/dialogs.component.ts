import { Component, ElementRef, OnChanges, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { GroupMessage } from 'src/app/models/groupMessage';
import { AUTHENTICATED_USERNAME } from 'src/app/services/auth.service';
import { WebsocketService } from 'src/app/services/websocket.service';
import {ChatService} from '../../services/chat.service';

@Component({
  selector: 'app-dialogs',
  templateUrl: './dialogs.component.html',
  styleUrls: ['./dialogs.component.css']
})
export class DialogsComponent implements OnInit{

  me=localStorage.getItem(AUTHENTICATED_USERNAME);
  message!:string;
  messages: Observable<GroupMessage[]> = new Observable<GroupMessage[]>();
  
  @ViewChild('scrolled') private myScrollContainer!: ElementRef;

  constructor(
    private chat: ChatService,
    private socket:WebsocketService
  ) { }

  ngOnInit() {
    this.messages = this.chat.getMessages();
    this.socket.connect();
  }


  send(){
    this.chat.sendMessage(this.message);
    this.message="";
    this.ngOnInit();
  }

  handleSubmit(event: { keyCode: number; }){
    if(event.keyCode===13){
      this.send();
      this.message="";
    }
  }


  ngAfterViewChecked() {        
    this.scrollToBottom();        
} 


  scrollToBottom(): void {
    try {
        this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch(err) { }                 
}

}
