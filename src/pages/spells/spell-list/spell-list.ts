import { Component } from '@angular/core';
import {NavController, IonicPage, ModalController, LoadingController} from 'ionic-angular';
import {SpellsService} from "../../../services/spells.service";
import {Spell} from "../../../models/spell.model";

@IonicPage()
@Component({
  selector: 'page-spell-list',
  templateUrl: 'spell-list.html'
})
export class SpellListPage {

  spells;

  constructor(
    public navCtrl: NavController,
    public spellsService: SpellsService,
    public modalCtrl: ModalController,
    public loadingCtrl: LoadingController) {
  }

  ionViewDidEnter() {
    let loader = this.loadingCtrl.create({
      content: "Loading spells…"
    });
    loader.present();
    this.spellsService.getSpells().then(
      (data) => {
        this.spells = data;
        loader.dismiss();
      }
    );
  }

  onShowSpell(spell: Spell) {
    let spellModal = this.modalCtrl.create('SingleSpellPage', {spell: spell});
    spellModal.present();
  }
}
