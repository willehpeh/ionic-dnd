import {Injectable} from "@angular/core";
import * as firebase from 'firebase';
import {Spell} from "../models/spell.model";

@Injectable()
export class SpellsService {

  spellList: Spell[];

  getSpells() {
    firebase.database().ref('spells').once('value').then(
      (snapshot) => {
        console.log(snapshot);
      }
    );
  }

  addNewSpell(spell: Spell) {
    firebase.database().ref('spells').push(spell).then(
      (snapshot) => {
        console.log(snapshot);
      }
    );
  }

}
