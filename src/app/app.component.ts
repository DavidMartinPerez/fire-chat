import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AuthService } from './providers/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  chats: Observable<any[]>;

  constructor(
      private db: AngularFirestore,
      public auth: AuthService
    ) {
    this.chats = db.collection('chats').valueChanges();
  }
}
