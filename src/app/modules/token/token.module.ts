import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TokenFormComponent } from './components/token-form.component';
import { TokenRoutingModule } from './token-routing.module';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [TokenFormComponent],
  imports: [
    CommonModule,
    TokenRoutingModule,
    ReactiveFormsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
  ],
  providers: [],
  bootstrap: [TokenFormComponent],
})
export class TokenModule {}
