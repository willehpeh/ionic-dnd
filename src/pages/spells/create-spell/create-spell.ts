import { Component } from '@angular/core';
import {NavController, IonicPage, ToastController, LoadingController, NavParams} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {SpellsService} from "../../../services/spells.service";
import {Spell} from "../../../models/spell.model";

@IonicPage()
@Component({
  selector: 'page-create-spell',
  templateUrl: 'create-spell.html'
})
export class CreateSpellPage {

  spellForm: FormGroup;
  rangeDistanceEnabled: boolean = true;
  materialTypeEnabled: boolean = false;
  durationEnabled: boolean = true;
  higherLevelsEnabled: boolean = false;

  spell: Spell;
  spellId: string;
  editMode: boolean = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public spellsService: SpellsService,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController) {

    if(this.navParams.get('spell')) {
      this.spell = this.navParams.get('spell');
      this.spellId = this.navParams.get('id');
      this.editMode = true;
    }
    this.buildForm();
    this.watchChanges();
  }

  buildForm() {
    if(this.editMode) {
      this.spellForm = this.formBuilder.group({
        name: [this.spell.name, Validators.required],
        school: [this.spell.school, Validators.required],
        level: [this.spell.level, Validators.required],
        ritual: this.spell.ritual,
        casting: this.formBuilder.group({
          amount: this.spell.casting.amount,
          unit: this.spell.casting.unit
        }),
        range: this.formBuilder.group({
          self: this.spell.range.self,
          touch: this.spell.range.touch,
          distance: this.spell.range.distance
        }),
        components: this.formBuilder.group({
          verbal: this.spell.components.verbal,
          somatic: this.spell.components.somatic,
          material: this.spell.components.material,
          materialType: this.spell.components.materialType
        }),
        duration: this.formBuilder.group({
          instantaneous: this.spell.duration.instantaneous,
          concentration: this.spell.duration.concentration,
          amount: this.spell.duration.amount,
          unit: this.spell.duration.unit
        }),
        description: this.spell.description,
        higherLevel: this.spell.higherLevelsDescription === '' ? false : true,
        higherLevelDescription: this.spell.higherLevelsDescription,
        availableTo: this.formBuilder.group({
          bard: this.spell.availableTo.bard,
          cleric: this.spell.availableTo.cleric,
          druid: this.spell.availableTo.druid,
          paladin: this.spell.availableTo.paladin,
          ranger: this.spell.availableTo.ranger,
          sorcerer: this.spell.availableTo.sorcerer,
          warlock: this.spell.availableTo.warlock,
          wizard: this.spell.availableTo.wizard
        })
      });
    }
    else if(!this.editMode) {
      this.spellForm = this.formBuilder.group({
        name: ['', Validators.required],
        school: ['', Validators.required],
        level: ['', Validators.required],
        ritual: false,
        casting: this.formBuilder.group({
          amount: 1,
          unit: 'actions'
        }),
        range: this.formBuilder.group({
          self: false,
          touch: false,
          distance: ''
        }),
        components: this.formBuilder.group({
          verbal: false,
          somatic: false,
          material: false,
          materialType: ''
        }),
        duration: this.formBuilder.group({
          instantaneous: false,
          concentration: false,
          amount: '',
          unit: ''
        }),
        description: '',
        higherLevel: false,
        higherLevelDescription: '',
        availableTo: this.formBuilder.group({
          bard: false,
          cleric: false,
          druid: false,
          paladin: false,
          ranger: false,
          sorcerer: false,
          warlock: false,
          wizard: false
        })
      });
    }
  }

  watchChanges() {
    let range = this.spellForm.get('range');
    range.valueChanges.forEach(
      () => {
        if(range.get('self').value || range.get('touch').value) {
          this.rangeDistanceEnabled = false;
        }
        else {
          this.rangeDistanceEnabled = true;
        }
      }
    );
    let components = this.spellForm.get('components');
    components.valueChanges.forEach(
      () => {
        if(components.get('material').value) {
          this.materialTypeEnabled = true;
        }
        else {
          this.materialTypeEnabled = false;
        }
      }
    );
    let duration = this.spellForm.get('duration');
    duration.valueChanges.forEach(
      () => {
        if(duration.get('instantaneous').value) {
          this.durationEnabled = false;
        }
        else {
          this.durationEnabled = true;
        }
      }
    );
    let higherLevel = this.spellForm.get('higherLevel');
    higherLevel.valueChanges.forEach(
      (value) => {
        this.higherLevelsEnabled = value;
      }
    );
  }

  submitForm() {
    let loader = this.loadingCtrl.create({
      content: 'Saving spell…'
    });
    loader.present();
    if(!this.editMode) {
      this.spellsService.addNewSpell(this.spellForm.value).then(
        () => {
          this.resetForm();
          loader.dismiss();
          this.toastCtrl.create({
            message: 'Spell added successfully',
            duration: 2000,
            position: "bottom"
          }).present();
        }, (error) => {
          console.log("submitForm error! " + error);
        }
      );
    }
    else if(this.editMode) {
      this.spellsService.modifySpell(this.spellId, this.spellForm.value).then(
        () => {
          this.navCtrl.setRoot('SingleSpellPage',
            {
              spell: {
                id: this.spellId,
                spell: this.spellForm.value
              }
            });
          loader.dismiss();
          this.toastCtrl.create({
            message: 'Spell saved successfully',
            duration: 2000,
            position: "bottom"
          }).present();
        }, (error) => {
          console.log("submitForm error! " + error);
        }
      );
    }

  }

  resetForm() {
    this.spellForm.reset();
    this.spellForm.get('casting').setValue({
      amount: 1,
      unit: 'actions'
    });
  }

}
