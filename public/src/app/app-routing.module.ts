import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AllComponent } from './all/all.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { HomeComponent } from './home/home.component';
import { EditComponent } from './edit/edit.component';
import { NewComponent } from './new/new.component';
import { EditChildComponent } from './edit-child/edit-child.component';
import { WriteComponent } from './write/write.component';

const routes: Routes = [
  { path: 'movies/new', component: NewComponent},
  { path: 'movies/:id', component: EditComponent},
  // { path: '', component: HomeComponent},
  { path: 'movies', component: AllComponent, children:[
    {path: 'editchild/:id', component: EditChildComponent}
  ]},
  {path: 'movies/:id/review', component: WriteComponent, pathMatch: 'full'},
  { path: '', pathMatch: 'full', redirectTo: '/movies'},
  { path: 'lost', component: PagenotfoundComponent},
  { path: '**', component: PagenotfoundComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
