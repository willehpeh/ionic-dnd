import {Injectable} from "@angular/core";
import * as firebase from 'firebase';
import {Subject} from "rxjs/Subject";

@Injectable()
export class AuthService {

  currentUser: firebase.User;
  isAuth = new Subject<boolean>();

  constructor() {
    firebase.auth().onAuthStateChanged(
      (user) => {
        if(user) {
          this.currentUser = user;
          this.isAuth.next(true);
          console.log("User returned by onAuthStateChanged:");
          console.log(user);
        }
        else {
          this.currentUser = null;
          this.isAuth.next(false);
          console.log("No User returned by onAuthStateChanged");
        }
      }
    );
  }

  login(email: string, password: string) {
    return new Promise(
      (resolve, reject) => {
        firebase.auth().signInWithEmailAndPassword(email, password).then(
          (data) => {
            resolve(data);
          }, (error) => {
            reject(error);
          }
        );
      }
    );
  }

  signup(email: string, password: string) {
    return new Promise(
      (resolve, reject) => {
        firebase.auth().createUserWithEmailAndPassword(email, password).then(
          (data) => {
            resolve(data);
          }, (error) => {
            reject(error);
          }
        );
      }
    );
  }

  signout() {
    return new Promise(
      (resolve, reject) => {
        firebase.auth().signOut().then(
          (data) => {
            resolve(data);
          }, (error) => {
            reject(error);
          }
        );
      }
    );
  }

}
