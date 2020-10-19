import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ResponsesComponent } from './responses/responses.component';

const routes: Routes = [
  { path: '', redirectTo: 'responses', pathMatch: 'full' },
  { path: 'responses', component: ResponsesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
