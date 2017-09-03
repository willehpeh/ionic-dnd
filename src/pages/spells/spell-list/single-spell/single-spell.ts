import { Component } from '@angular/core';
import {NavController, IonicPage, NavParams, ViewController} from 'ionic-angular';
import {Spell} from "../../../../models/spell.model";

@IonicPage()
@Component({
  selector: 'page-single-spell',
  templateUrl: 'single-spell.html'
})
export class SingleSpellPage {

  spell: Spell;
  id: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController) {


    this.spell = this.navParams.get('spell').spell;
    this.id = this.navParams.get('spell').id;
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  editSpell() {
    this.navCtrl.setRoot('CreateSpellPage', {id: this.id, spell: this.spell});
  }
}
