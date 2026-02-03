import { Component, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface FilterCriteria {
  search: string;
  category: string;
}

@Component({
  selector: 'app-filter-panel',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './filter-panel.component.html',
  styleUrls: ['./filter-panel.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilterPanelComponent {
  @Output() filterChange = new EventEmitter<FilterCriteria>();

  search = '';
  category = '';
  categories = ['Electronics', 'Clothing', 'Food', 'Books', 'Other'];

  onSearchChange(value: string) {
    this.search = value;
    this.emitFilter();
  }

  onCategoryChange(value: string) {
    this.category = value;
    this.emitFilter();
  }

  resetFilters() {
    this.search = '';
    this.category = '';
    this.emitFilter();
  }

  private emitFilter() {
    this.filterChange.emit({
      search: this.search,
      category: this.category
    });
  }
}
