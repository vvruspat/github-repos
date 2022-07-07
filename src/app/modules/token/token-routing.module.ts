import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TokenFormComponent } from './components/token-form.component';

const routes: Routes = [
  {
    path: '',
    component: TokenFormComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TokenRoutingModule {}
