import {NgModule} from '@angular/core';
import {Routes,RouterModule} from '@angular/router';

import { AppComponent } from './app.component';


const appRoutes:Routes=[
  {path:'', component:AppComponent},
  {path:'**',redirectTo:'/not-found',pathMatch:'full'}
  
]

@NgModule({
imports:[
      RouterModule.forRoot(appRoutes)
],

exports:[RouterModule]
})
export class AppRoutingModule{

}