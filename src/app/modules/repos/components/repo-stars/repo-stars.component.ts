import { Component, Input } from '@angular/core';

@Component({
  selector: 'repo-stars',
  templateUrl: './repo-stars.component.html',
  styleUrls: ['./repo-stars.component.css'],
})
export class RepoStarsComponent {
  @Input() stars!: number;
  constructor() {}
}
