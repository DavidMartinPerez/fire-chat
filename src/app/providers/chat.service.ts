import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Message } from '../interface/message.interface';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private itemsCollection: AngularFirestoreCollection<Message>;
  public chats: Message[] = [];

  constructor(
    private afs: AngularFirestore
  ) {}


  cargarMensajes(): Observable<void> {
    this.itemsCollection = this.afs.collection<Message>('chats');

    return this.itemsCollection.valueChanges().pipe(
      map( (data: Message[]) => {
        this.chats = data
      })
    )
  }

  enviarMensaje( texto_mensaje: string ) : Promise<DocumentReference> {
    let message: Message = {
      fecha: new Date().getTime(),
      remitente: "David Prueba",
      mensaje: texto_mensaje,
    }

    return this.itemsCollection.add( message )
  }
}
