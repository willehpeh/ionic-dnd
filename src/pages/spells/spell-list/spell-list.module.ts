import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SpellListPage } from './spell-list';

@NgModule({
  declarations: [
    SpellListPage,
  ],
  imports: [
    IonicPageModule.forChild(SpellListPage),
  ],
  exports: [
    SpellListPage
  ]
})
export class SpellListPageModule {}
