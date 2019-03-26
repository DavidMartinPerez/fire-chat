import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    public usuario: any = {};

    constructor(
        public afAuth: AngularFireAuth
    ) {
        this.afAuth.authState.subscribe(
            user => {
                console.log( 'Estado del usuario:', user );

                if( user ) {
                    this.usuario.uid = user.uid;
                    this.usuario.remitente = user.displayName;
                } else {
                    return false;
                }
            }
        )
    }

    loginWithGoogle() {
        this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
    }


    logout() {
        this.usuario = {};
        this.afAuth.auth.signOut();
    }

}