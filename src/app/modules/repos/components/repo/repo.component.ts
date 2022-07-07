import { Component, Input, OnInit } from '@angular/core';
import { Repository } from 'src/app/types/repository.type';

@Component({
  selector: 'repo',
  templateUrl: './repo.component.html',
  styleUrls: ['./repo.component.css'],
})
export class RepoComponent implements OnInit {
  @Input() repo!: Repository;

  constructor() {}

  ngOnInit() {}
}
