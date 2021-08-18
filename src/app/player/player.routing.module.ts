import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlayerComponent } from './player.component';

const rutes: Routes = [
  { path: '', component: PlayerComponent },
  { path: '**', redirectTo: '/not-found', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(rutes)],
  exports: [RouterModule]
})
export class PlayerRoutingModule {}
