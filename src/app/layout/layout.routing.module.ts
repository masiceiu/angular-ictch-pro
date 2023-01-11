import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LayoutComponent } from './layout.component';

const rutes: Routes = [
  { path: '', component: LayoutComponent },
  { path: '**', redirectTo: '/not-found', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(rutes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule {}
