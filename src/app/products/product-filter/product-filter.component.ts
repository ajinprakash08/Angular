import { Component, OnInit, Input } from '@angular/core';
import { CategoriesService } from 'src/app/categories.service';
import { map, take } from 'rxjs/operators';
@Component({
  selector: 'product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent implements OnInit {
  categories$;
  @Input('category') category;
  constructor(private categoryService: CategoriesService) {
    this.categories$ = categoryService.getCategories().snapshotChanges().pipe(map(categories => {
      console.log(categories);
      return categories = categories.sort((a, b) => (a as any).key - (b as any).key);
    }));
  }

  ngOnInit(): void {
  }

}
