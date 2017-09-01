import { Component } from '@angular/core';
import {NavController, IonicPage, ToastController, LoadingController} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {SpellsService} from "../../../services/spells.service";

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

  constructor(
    public navCtrl: NavController,
    public formBuilder: FormBuilder,
    public spellsService: SpellsService,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController) {

    this.buildForm();
    this.watchChanges();
  }

  buildForm() {
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

  resetForm() {
    this.spellForm.reset();
    this.spellForm.get('casting').setValue({
      amount: 1,
      unit: 'actions'
    });
  }

}
