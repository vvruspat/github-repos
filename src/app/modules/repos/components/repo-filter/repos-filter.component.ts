import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'repos-filter',
  templateUrl: './repos-filter.component.html',
  styleUrls: ['./repos-filter.component.css'],
})
export class ReposFilterComponent implements OnChanges {
  @Input() defaultValue = 'react';
  @Output() onChange: EventEmitter<string> = new EventEmitter();

  value: string = '';
  timer: number = 0;

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['defaultValue']) {
      this.value = changes['defaultValue'].currentValue;
    }
  }

  onFilterChange() {
    if (this.timer) {
      window.clearTimeout(this.timer);
    }

    this.timer = window.setTimeout(() => {
      this.onChange.emit(this.value);
    }, 500);
  }
}
