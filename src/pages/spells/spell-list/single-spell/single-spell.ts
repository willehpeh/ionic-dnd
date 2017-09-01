import { Component } from '@angular/core';
import {NavController, IonicPage, NavParams, ViewController} from 'ionic-angular';
import {SpellsService} from "../../../../services/spells.service";
import {Spell} from "../../../../models/spell.model";

@IonicPage()
@Component({
  selector: 'page-single-spell',
  templateUrl: 'single-spell.html'
})
export class SingleSpellPage {

  spell: Spell;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public spellsService: SpellsService,
    public viewCtrl: ViewController) {

    this.spell = navParams.get('spell');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
