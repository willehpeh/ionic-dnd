import {Injectable} from "@angular/core";
import * as firebase from 'firebase';
import {Spell} from "../models/spell.model";

@Injectable()
export class SpellsService {

  getSpells() {
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('spells/all-spells').orderByKey().once('value').then(
          (snapshot) => {
            let childData = [];
            snapshot.forEach(
              (childSnapshot) => {
                childData.push({
                  spell: childSnapshot.val(),
                  id: childSnapshot.key});
              }
            );
            resolve(childData);
          }, (error) => {
            reject(error);
          }
        );
      }
    );
  }

  addNewSpell(spell: Spell) {
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('spells/all-spells').push(spell).then(
          (snapshot) => {
            resolve(snapshot);
          }, (error) => {
            reject(error);
          }
        );
      }
    );
  }

  modifySpell(id: string, spell: Spell) {
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('spells/all-spells/' + id).update(spell).then(
          (snapshot) => {
            resolve(snapshot);
          }, (error) => {
            reject(error);
          }
        );
      }
    );
  }

}
