import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AllComponent } from './all/all.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { HomeComponent } from './home/home.component';
import { EditComponent } from './edit/edit.component';
import { NewComponent } from './new/new.component';

const routes: Routes = [
  { path: 'new', component: NewComponent},
  { path: 'edit/:id', component: EditComponent},
  { path: '', component: HomeComponent},
  { path: 'all', component: AllComponent},
  // { path: '', pathMatch: 'full', redirectTo: '/all'},
  { path: 'lost', component: PagenotfoundComponent},
  { path: '**', component: PagenotfoundComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
