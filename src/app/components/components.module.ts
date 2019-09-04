import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CultoDetalhesPage } from './culto-detalhes/culto-detalhes.page';

const DED = [
    CultoDetalhesPage
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
  ],
  entryComponents: DED,
  declarations: DED,
  exports: DED
})
export class ComponentsModule {}
