import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../../product';
import { ShoppingCartService } from 'src/app/shopping-cart.service';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  @Input('product') product: Product;
  @Input('showactions') showactions = true;
  constructor(private cartService: ShoppingCartService) {
    console.log('this is product' + this.product);
  }
  ngOnInit(): void {

  }
  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }
}
