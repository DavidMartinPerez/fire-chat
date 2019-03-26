import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ChatService } from 'src/app/providers/chat.service';
import { AuthService } from 'src/app/providers/auth.service';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styles: []
})
export class ChatComponent implements OnInit {

  public mensaje:string = "";
  public elemento: ElementRef

  @ViewChild("appMensaje") elementChat: ElementRef 

  constructor(
    public cs: ChatService,
    public auth: AuthService
  ) {
    this.cs.cargarMensajes().subscribe(
      () => {
        this.elementChat.nativeElement.scrollTop = this.elementChat.nativeElement.scrollHeight;
      }
    )
  }

  ngOnInit() {
  }


  enviar_mensaje() {

    if ( this.mensaje.length > 0 ) {
      this.cs.enviarMensaje( this.mensaje )
        .then ( () => this.mensaje = "" )
        .catch( (err)=>console.error(err) )
    }

  }
}
