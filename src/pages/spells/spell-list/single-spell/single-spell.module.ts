import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SingleSpellPage } from './single-spell';

@NgModule({
  declarations: [
    SingleSpellPage,
  ],
  imports: [
    IonicPageModule.forChild(SingleSpellPage),
  ],
  exports: [
    SingleSpellPage
  ]
})
export class SingleSpellPageModule {}
