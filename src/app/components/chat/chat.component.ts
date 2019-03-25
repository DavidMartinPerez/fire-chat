import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/providers/chat.service';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styles: []
})
export class ChatComponent implements OnInit {

  public mensaje:string = "";

  constructor(
    public cs: ChatService
  ) {
    this.cs.cargarMensajes().subscribe()
  }

  ngOnInit() {
  }


  enviar_mensaje() {

    if ( this.mensaje.length > 0 ) {
      this.cs.enviarMensaje( this.mensaje )
        .then ( () => console.log("Mensaje enviado") )
        .catch( (err)=>console.error(err) )
    }

  }
}
