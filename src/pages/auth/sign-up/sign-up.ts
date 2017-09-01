import { Component } from '@angular/core';
import { NavController, IonicPage, LoadingController } from 'ionic-angular';
import {NgForm} from "@angular/forms";
import {AuthService} from "../../../services/auth.service";

@IonicPage()
@Component({
  selector: 'page-sign-up',
  templateUrl: 'sign-up.html'
})
export class SignUpPage {

  errorMessage: string;

  onSignUp(form: NgForm) {
    let email = form.value.email;
    let password = form.value.password;
    let passwordConfirm = form.value.passwordConfirm;
    if(password !== passwordConfirm) {
      this.errorMessage = "Passwords do not match!"
    }
    else if(password === passwordConfirm) {
      let loading = this.loadingCtrl.create({
        content: "Signing up…"
      });
      loading.present();
      this.errorMessage = "";
      this.authService.signup(email, password).then(
        () => {
          loading.dismiss();
          this.navCtrl.setRoot("SpellListPage");
        }, (error) => {
          this.errorMessage = error.message;
          loading.dismiss();
        }
      );
    }
  }

  constructor(
    public navCtrl: NavController,
    public authService: AuthService,
    public loadingCtrl: LoadingController) {

  }

}
