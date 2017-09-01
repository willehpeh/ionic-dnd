import { Component } from '@angular/core';
import {NavController, IonicPage, LoadingController} from 'ionic-angular';
import {AuthService} from "../../../services/auth.service";
import {NgForm} from "@angular/forms";

@IonicPage()
@Component({
  selector: 'page-sign-in',
  templateUrl: 'sign-in.html'
})
export class SignInPage {

  errorMessage: string;

  onSignIn(form: NgForm) {
    let email = form.value.email;
    let password = form.value.password;
    let loading = this.loadingCtrl.create({
      content: "Signing in…"
    });
    loading.present();
    this.errorMessage = "";
    this.authService.login(email, password).then(
      () => {
        loading.dismiss();
        this.navCtrl.setRoot("SpellListPage");
      }, (error) => {
        this.errorMessage = error.message;
        loading.dismiss();
      }
    );
  }

  constructor(
    public navCtrl: NavController,
    public authService: AuthService,
    public loadingCtrl: LoadingController) {

  }

}
