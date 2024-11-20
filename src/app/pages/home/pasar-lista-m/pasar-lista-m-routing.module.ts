import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PasarListaMPage } from './pasar-lista-m.page';

const routes: Routes = [
  {
    path: '',
    component: PasarListaMPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PasarListaMPageRoutingModule {}
