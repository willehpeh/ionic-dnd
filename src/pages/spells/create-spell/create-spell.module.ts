import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreateSpellPage } from "./create-spell";

@NgModule({
  declarations: [
    CreateSpellPage,
  ],
  imports: [
    IonicPageModule.forChild(CreateSpellPage),
  ],
  exports: [
    CreateSpellPage
  ]
})
export class CreateSpellPageModule {}
