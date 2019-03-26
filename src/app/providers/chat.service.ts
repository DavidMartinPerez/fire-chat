import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Message } from '../interface/message.interface';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private itemsCollection: AngularFirestoreCollection<Message>;
  public chats: Message[] = [];

  constructor(
    private afs: AngularFirestore,
    private auth:AuthService
  ) {}

  getMensajes = ref => ref.orderBy('fecha', 'desc').limit(5)

  cargarMensajes(): Observable<void> {
    this.itemsCollection = this.afs.collection<Message>('chats', this.getMensajes );

    return this.itemsCollection.valueChanges().pipe(
      map( (data: Message[]) => {
        this.chats = [];

        for( let mensaje of data) {
          this.chats.unshift(mensaje) //con unshitf añadimos al principio del array
        }

      })
    )
  }

  enviarMensaje( texto_mensaje: string ) : Promise<DocumentReference> {
    let message: Message = {
      fecha: new Date().getTime(),
      remitente: this.auth.usuario.remitente,
      mensaje: texto_mensaje,
      uid: this.auth.usuario.uid
    }

    return this.itemsCollection.add( message )
  }
}
