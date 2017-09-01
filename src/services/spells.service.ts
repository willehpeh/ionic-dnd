import {Injectable} from "@angular/core";
import * as firebase from 'firebase';
import {Spell} from "../models/spell.model";

@Injectable()
export class SpellsService {

  spellList: Spell[];

  getSpells() {
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('spells/all-spells').orderByKey().once('value').then(
          (snapshot) => {
            let childData = [];
            snapshot.forEach(
              (childSnapshot) => {
                childData.push(childSnapshot.val());
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

}
