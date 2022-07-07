import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'repos-filter',
  templateUrl: './repos-filter.component.html',
  styleUrls: ['./repos-filter.component.css'],
})
export class ReposFilterComponent {
  @Input() value: string = '';
  @Output() onChange: EventEmitter<string> = new EventEmitter();

  constructor() {}

  onFilterChange(event: Event) {
    console.log((event.target as HTMLInputElement).value);

    this.onChange.emit((event?.target as HTMLInputElement).value);
  }
}
