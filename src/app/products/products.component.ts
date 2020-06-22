import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../product.service';
import { Subscription } from 'rxjs';
import { DataTableResource } from 'angular5-data-table';
import { Product } from '../product';
import { CategoriesService } from '../categories.service';
import { map, take } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  filterredProducts: Product[] = [];
  subscription: Subscription;
  category: string;
  constructor(private productService: ProductService, private route: ActivatedRoute ) {
    this.subscription = productService.getAll().snapshotChanges().subscribe(data => {
      if (data) {
        if (data.length > 0) {
          console.log(data); const i = 0;
          data.forEach(element => {
            const product = {
              payload: element.payload.val(),
              key: element.key
            };
            this.products.push(product as Product);
          });
          if(this.products){
          this.filterredProducts =this.products;
          }
        }        
      }
      route.queryParamMap.subscribe(param => {
        this.category = param.get('category');
        this.filterredProducts = (this.category) ?
        this.products.filter(p => p.payload.category.toLocaleLowerCase() === this.category.toLocaleLowerCase()) :
        this.products;
      });
    });

  }
  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
