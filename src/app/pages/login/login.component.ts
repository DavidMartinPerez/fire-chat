import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/providers/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {

  public const = {
    twitter: 'twitter',
    google: 'google'
  }
  constructor(
    private auth: AuthService
  ) { }

  ngOnInit() {
  }

  ingresar( proveedor ) {

    switch ( proveedor ) {
      case this.const.google:

        this.auth.loginWithGoogle()

        break;
      case this.const.twitter:

        break
    }

  }

}
