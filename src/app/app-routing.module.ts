import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EditComponent } from './edit/edit.component';
import { SearchComponent } from "./search/search.component";

const routes: Routes = [
  { path: 'search', component: SearchComponent },
  { path: 'edit/:id', component: EditComponent },
  { path: '', redirectTo: '/search', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
