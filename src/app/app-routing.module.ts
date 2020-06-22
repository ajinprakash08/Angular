import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { LoginComponent } from './login/login.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { AuthGuard } from './auth-guard.service';
import { AdminAuthGuard } from './admin-auth-guard.service';
import { ProductFormComponent } from './admin/product-form/product-form.component';
import { ProductFormEditComponent } from './admin/product-form-edit/product-form-edit.component';


const routes: Routes = [
 { path: '', component: HomeComponent},
 { path: 'login', component: LoginComponent},
 { path: 'products', component: ProductsComponent},
 { path: 'shopping-cart', component: ShoppingCartComponent},
 { path: 'my/orders', component: MyOrdersComponent, canActivate: [AuthGuard]},
 { path: 'check-out', component: CheckoutComponent, canActivate: [AuthGuard]},
 { path: 'order-success', component: OrderSuccessComponent, canActivate: [AuthGuard]},
 { path: 'admin/products/new', component: ProductFormComponent, canActivate: [AuthGuard, AdminAuthGuard]},
 { path: 'admin/products/:id', component: ProductFormEditComponent , canActivate: [AuthGuard, AdminAuthGuard]},
 { path: 'admin/products', component: AdminProductsComponent, canActivate: [AuthGuard, AdminAuthGuard]},
 { path: 'admin/orders', component: AdminOrdersComponent, canActivate: [AuthGuard, AdminAuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
