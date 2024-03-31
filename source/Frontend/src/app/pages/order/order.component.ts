import { Component, OnInit }                    from '@angular/core';
import { CommonModule }                         from '@angular/common';
import { FormsModule }                          from '@angular/forms';
import { Router }                               from '@angular/router';
import { Observable, lastValueFrom, map, tap }  from 'rxjs';
import { EcontDeliveryComponent }               from '../../components/econt/econt-delivery/econt-delivery.component';
import { CartsService }                         from '../../services/carts.service';
import { OrdersService }                        from '../../services/orders.service';
import { CartItemResponse }                     from '../../services/responses/carts/cart-item.response';
import { CreateOrderRequest }                   from '../../services/requests/orders/create-order.request';
import { AlertService } from '../../services/alert.service';

@Component({
    selector: 'app-order',
    standalone: true,
    templateUrl: './order.component.html',
    styleUrl: './order.component.css',
    imports: [ CommonModule, EcontDeliveryComponent, FormsModule ]
})
export class OrderComponent implements OnInit {

    order = new CreateOrderRequest;
    cartItems$ = new Observable<CartItemResponse[]>;
    toOffice = true;
    cartItemsTotal = 0;
    processingRequest = false;

    constructor(
        private _alertService: AlertService,
        private _cartsService: CartsService,
        private _ordersService: OrdersService,
        private _router: Router
    ) {}

    ngOnInit() {
        window.scrollTo(0, 0);

        this.cartItems$ = this._cartsService.items$
        .pipe(
            tap(items => this.handleEmptyCart(items))
        );
        
        this.cartItems$
        .pipe(map(items => this.getCartItemsTotal(items)))
        .subscribe(cartItemsTotal => this.cartItemsTotal = cartItemsTotal);
    }

    onAddressChange(newAddress: string) {
        this.order.address = newAddress;
    }

    onDeliveryPriceChange(newDeliveryPrice: number) {
        this.order.deliveryPrice = newDeliveryPrice;
    }

    private getCartItemsTotal(items: CartItemResponse[]): number {
        let total = 0;
        for (let item of items) {
            total += item.price * item.quantity;
        }
        return total;
    }

    private handleEmptyCart(items: CartItemResponse[]) {
        if (items.length == 0) {
            this._router.navigateByUrl('/');
        }
    }

    async onSubmit() {
        this.processingRequest = true;
        await lastValueFrom(this._ordersService.create(this.order));
        this._alertService.setMessage('Поръчката е направена успешно.');
        this._cartsService.resetItemsSubject();
        this.processingRequest = false;
        this._router.navigateByUrl('/');
    }
}
