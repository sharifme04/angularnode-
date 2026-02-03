import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService, Product } from '../../core/services/product.service';
import { ProductTableComponent } from '../../shared/components/product-table/product-table.component';
import { FilterPanelComponent, FilterCriteria } from '../../shared/components/filter-panel/filter-panel.component';
import { ProductFormComponent } from '../../shared/components/product-form/product-form.component';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, ProductTableComponent, FilterPanelComponent, ProductFormComponent],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  isLoading = false;
  isSubmitting = false;
  showForm = false;
  selectedProduct: Product | null = null;

  private destroy$ = new Subject<void>();
  private currentFilter: FilterCriteria = { search: '', category: '' };

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.loadProducts();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadProducts() {
    this.isLoading = true;
    this.productService.getProducts(this.currentFilter.search, this.currentFilter.category)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          this.products = response.data || [];
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error loading products:', error);
          this.isLoading = false;
        }
      });
  }

  onAddNew() {
    this.selectedProduct = null;
    this.showForm = true;
  }

  onEdit(product: Product) {
    this.selectedProduct = product;
    this.showForm = true;
  }

  onDelete(id: string) {
    this.productService.deleteProduct(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.loadProducts();
        },
        error: (error) => {
          console.error('Error deleting product:', error);
        }
      });
  }

  onFormSubmit(product: Product) {
    this.isSubmitting = true;
    const request$ = this.selectedProduct
      ? this.productService.updateProduct(this.selectedProduct._id!, product)
      : this.productService.createProduct(product);

    request$.pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.showForm = false;
          this.selectedProduct = null;
          this.isSubmitting = false;
          this.loadProducts();
        },
        error: (error) => {
          console.error('Error saving product:', error);
          this.isSubmitting = false;
        }
      });
  }

  onFormCancel() {
    this.showForm = false;
    this.selectedProduct = null;
  }

  onFilterChange(filter: FilterCriteria) {
    this.currentFilter = filter;
    this.loadProducts();
  }
}
