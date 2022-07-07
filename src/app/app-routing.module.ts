import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const token = localStorage.getItem('token');

const routes: Routes = [
  {
    path: 'token',
    loadChildren: () =>
      import('./modules/token/token.module').then((m) => m.TokenModule),
  },
  {
    path: 'repos',
    loadChildren: () =>
      import('./modules/repos/repos.module').then((m) => m.ReposModule),
  },
  {
    path: '',
    redirectTo: token ? 'repos' : 'token',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [],
})
export class AppRoutingModule {}
