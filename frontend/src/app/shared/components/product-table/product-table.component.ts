import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../../core/services/product.service';

@Component({
  selector: 'app-product-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-table.component.html',
  styleUrls: ['./product-table.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductTableComponent {
  @Input() products: Product[] = [];
  @Input() isLoading = false;
  @Output() edit = new EventEmitter<Product>();
  @Output() delete = new EventEmitter<string>();

  onEdit(product: Product) {
    this.edit.emit(product);
  }

  onDelete(id: string | undefined) {
    if (id && confirm('Are you sure you want to delete this product?')) {
      this.delete.emit(id);
    }
  }

  trackByProductId(index: number, product: Product): string | undefined {
    return product._id;
  }
}
