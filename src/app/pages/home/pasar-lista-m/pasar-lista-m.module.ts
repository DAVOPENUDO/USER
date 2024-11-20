import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PasarListaMPageRoutingModule } from './pasar-lista-m-routing.module';

import { PasarListaMPage } from './pasar-lista-m.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PasarListaMPageRoutingModule,
    ComponentsModule
  ],
  declarations: [PasarListaMPage]
})
export class PasarListaMPageModule {}
