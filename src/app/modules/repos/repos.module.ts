import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { ReposListComponent } from './components/repos-list.component';
import { ReposRoutingModule } from './repos-routing.module';
import { RepoComponent } from './components/repo/repo.component';
import { RepoOwnerComponent } from './components/repo-owner/repo-owner.component';
import { RepoStarsComponent } from './components/repo-stars/repo-stars.component';
import { ReposFilterComponent } from './components/repo-filter/repos-filter.component';

@NgModule({
  declarations: [
    ReposListComponent,
    RepoComponent,
    RepoOwnerComponent,
    RepoStarsComponent,
    ReposFilterComponent,
  ],
  imports: [
    CommonModule,
    ReposRoutingModule,
    ReactiveFormsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
  ],
  providers: [],
  bootstrap: [ReposListComponent],
})
export class ReposModule {}
