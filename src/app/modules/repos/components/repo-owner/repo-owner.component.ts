import { Component, Input } from '@angular/core';
import { User } from 'src/app/types/user.type';

@Component({
  selector: 'repo-owner',
  templateUrl: './repo-owner.component.html',
  styleUrls: ['./repo-owner.component.css'],
})
export class RepoOwnerComponent {
  @Input() owner!: User;
  constructor() {}
}
