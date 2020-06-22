import { Component, OnInit } from '@angular/core';
import { CategoriesService } from 'src/app/categories.service';
import { ProductService } from 'src/app/product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { map, take } from 'rxjs/operators';
@Component({
  selector: 'app-product-form-edit',
  templateUrl: './product-form-edit.component.html',
  styleUrls: ['./product-form-edit.component.css']
})
export class ProductFormEditComponent implements OnInit {
  categories$;
  product;
  id;

  constructor(private categoryService: CategoriesService,
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute) {
    this.categories$ = categoryService.getCategories().snapshotChanges().pipe(map(categories => {
      console.log(categories);
      return categories = categories.sort((a, b) => (a as any).key - (b as any).key);
    }));
    this.id = this.route.snapshot.paramMap.get('id');

    if (this.id) {
      this.productService.getProduct(this.id).snapshotChanges().pipe(take(1)).subscribe(p => {
        console.log(p);
        this.product = p;
      });

    }
    else {
      this.product = {};
      console.log(this.product);
    }
  }
  save(product) {
    if (this.id) {
      console.log(product);
      this.productService.update(product, this.id).then(() => {
        this.router.navigate(['/admin/products']);
      });

    }
  }
  delete() {
    if (confirm('Are you sure you want to delete the item?')) {
      if (this.id) {
        console.log(this.id);
        this.productService.delete(this.id).then(() => {
          this.router.navigate(['/admin/products']);
        });

      }
    }
  }
  ngOnInit(): void {
  }

}
