import { Component } from '@angular/core';
import {NavController, IonicPage, ModalController} from 'ionic-angular';
import {SpellsService} from "../../../services/spells.service";
import {Spell} from "../../../models/spell.model";

@IonicPage()
@Component({
  selector: 'page-spell-list',
  templateUrl: 'spell-list.html'
})
export class SpellListPage {

  spells: Spell[];

  constructor(
    public navCtrl: NavController,
    public spellsService: SpellsService,
    public modalCtrl: ModalController) {
  }

  ionViewDidEnter() {
    this.spellsService.getSpells().then(
      (data: Spell[]) => {
        this.spells = data.slice();
      }
    );
  }

  onShowSpell(spell: Spell) {
    let spellModal = this.modalCtrl.create('SingleSpellPage', {spell: spell});
    spellModal.present();
  }
}
