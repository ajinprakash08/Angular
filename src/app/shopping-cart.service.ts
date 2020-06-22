import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Product, NewProduct } from './product';
import 'rxjs/add/operator/take';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }
  private create() {
    return this.db.list('/shopping-cart').push({
      dateCreated: new Date().getTime()
    });
  }
  private getShoppingcart(cartID: string) {
    return this.db.object('/shopping-carts/' + cartID);
  }

  private async getOrCreatecartID() {
    const cartId = localStorage.getItem('cartId');
    if (cartId) { return cartId; }
    else {
      const result = await this.create();
      localStorage.setItem('cartId', result.key);
      return result.key;
    }

  }
  async addToCart(product: Product) {

    console.log(product);
    const cartId = await this.getOrCreatecartID();
    const items$  = this.db.object('/shopping-carts/' + cartId + '/items/' + product.key).snapshotChanges();
    items$.take(1).subscribe((item) => {
      console.log(item.payload.child('quantity').node_.value_);
      console.log(product.key);
      if (item.payload.exists()) {
        // tslint:disable-next-line:max-line-length
        this.db.object('/shopping-carts/' + cartId + '/items/' + product.key).update({quantity: item.payload.child('quantity').node_.value_+ 1 });
      }
      else {
        product.quantity = 1;
        this.db.object('/shopping-carts/' + cartId + '/items/' + product.key).set({ product, quantity: 1 });
      }
    });
  }
}
