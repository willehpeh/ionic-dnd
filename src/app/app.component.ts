import {Component, ViewChild} from '@angular/core';
import {MenuController, NavController, Platform} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import * as firebase from 'firebase';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  rootPage: string = 'HomePage';
  isAuth: boolean;
  @ViewChild('maincontent') mainContent: NavController;

  onLoad(page: string) {
    this.mainContent.setRoot(page);
    this.menuCtrl.close();
  }

  signOut() {
    firebase.auth().signOut();
  }

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    public menuCtrl: MenuController) {

    let config = {
      apiKey: "AIzaSyCgyZBfycvMp2wfbRkz2RaFhVim8bC3TPc",
      authDomain: "fir-dnd-c85c8.firebaseapp.com",
      databaseURL: "https://fir-dnd-c85c8.firebaseio.com",
      projectId: "fir-dnd-c85c8",
      storageBucket: "fir-dnd-c85c8.appspot.com",
      messagingSenderId: "561137656061"
    };
    firebase.initializeApp(config);

    firebase.auth().onAuthStateChanged(
      (user) => {
        if(user) {
          this.isAuth = true;
        }
        else {
          this.isAuth = false;
        }
      }
    );

    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}

