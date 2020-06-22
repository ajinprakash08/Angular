import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Product } from './product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db: AngularFireDatabase) { }
  create(product){
    return this.db.list('/products').push(product);
  }
  getAll(){
    return this.db.list('/products');
  }
  getProduct(id){
    return this.db.object('/products/' + id);
  }
  update(product, id){
    return this.db.object('/products/' + id).update(product);
  }
  delete(id){
    return this.db.object('/products/' + id).remove();
  }
}
