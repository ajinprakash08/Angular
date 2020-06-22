import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from 'src/app/product.service';
import { Observable, Subscription } from 'rxjs';
import { map, count } from 'rxjs/operators';
import { DataTableResource } from 'angular5-data-table';
import { Product } from 'src/app/product';
import { AngularFireList } from '@angular/fire/database';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  products: any[] = [];
  filterredProducts: any[];
  subscription: Subscription;
  tableResource: DataTableResource<Product>;
  items: Product[] = [];
  itemCount = 0;
  constructor(private productService: ProductService) {
    this.subscription=  productService.getAll().snapshotChanges().subscribe(data => {
      if (data) {
        if (data.length > 0) {
          console.log(data); let i = 0;
          data.forEach(element => {         
            let prd = {
              payload: element.payload.val(),
              key: element.key
            };
            this.products.push(prd); 
          });
          this.initializeDataTable(this.products as Product[]);
        }
      }
    });

  }

  private initializeDataTable(productList: Product[]) {
    console.log(this.products);
    this.tableResource = new DataTableResource(productList);
    this.tableResource.query({ offset: 0 })
      .then(items => this.items = items);
    this.tableResource.count()
      .then(count => this.itemCount = count);
      console.log("items: "+this.items)
  }
  filter(query: string) {
    console.log(query);
    this.filterredProducts = (query) ?
      (this.products as Product[]).filter(p => p.payload.title.toLowerCase().includes(query.toLowerCase())) :
      this.products;
      this.initializeDataTable(this.filterredProducts as Product[]);

  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  reloadItems(params) {
    if (!this.tableResource) { return; }
    this.tableResource.query(params)
      .then(item => this.items = this.items);
  }

  ngOnInit() {

  }
}
