import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'token-form',
  templateUrl: './token-form.component.html',
  styleUrls: ['./token-form.component.css'],
})
export class TokenFormComponent implements OnInit {
  token: string | null = null;
  tokenFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(40),
    Validators.maxLength(40),
  ]);

  constructor(private router: Router) {}

  ngOnInit() {}

  onLoginClick() {
    this.tokenFormControl.valid &&
      localStorage.setItem('token', this.tokenFormControl.value);
    this.router.navigateByUrl('repos');
  }
}
