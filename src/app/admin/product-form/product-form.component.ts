import { Component, OnInit, OnDestroy } from '@angular/core';
import { CategoriesService } from 'src/app/categories.service';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { ProductService } from 'src/app/product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFireObject, SnapshotAction } from '@angular/fire/database';
@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent {
  categories$;
 
  constructor(private categoryService: CategoriesService,
              private productService: ProductService,
              private router: Router,
              private route: ActivatedRoute) {
    this.categories$ = categoryService.getCategories().snapshotChanges().pipe(map(categories => {
      console.log(categories);
      return categories = categories.sort((a, b) => (a as any).key - (b as any).key);
    }));
    
  }

  save(product) {
    console.log(product);
    this.productService.create(product);
    this.router.navigate(['/admin/products']);
  }
}
