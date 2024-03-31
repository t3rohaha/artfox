import { CommonModule }             from '@angular/common';
import { Component, OnInit }        from '@angular/core';
import { FormsModule }              from '@angular/forms';
import { ActivatedRoute, Router }   from '@angular/router';
import { lastValueFrom }            from 'rxjs';
import { AdminOrdersService }       from '../../../services/admin-orders.service';
import { OrderDetailsResponse }     from '../../../../services/responses/orders/order-details.response';
import { OrderItemResponse }        from '../../../../services/responses/orders/order-item.response';
import { UpdateOrderRequest }       from '../../../../services/requests/orders/update-order.request';
import { EcontDeliveryComponent }   from '../../../../components/econt/econt-delivery/econt-delivery.component';

@Component({
    selector: 'app-edit-order',
    standalone: true,
    templateUrl: './edit-order.component.html',
    styleUrl: './edit-order.component.css',
    imports: [
        CommonModule,
        EcontDeliveryComponent,
        FormsModule
    ]
})
export class EditOrderComponent implements OnInit {

    order = new UpdateOrderRequest;
    orderItems: OrderItemResponse[] = [];
    productsPrice = 0;
    statuses = ['Pending', 'Sent', 'Completed', 'Cancelled'];

    constructor(
        private _ordersService: AdminOrdersService,
        private _router: Router,
        private _route: ActivatedRoute
    ) {}

    async ngOnInit() {
        const orderId = this._route.snapshot.paramMap.get('id')!;
        const order = await lastValueFrom(this._ordersService.get(orderId));
        this.order = this.mapToUpdateOrderRequest(orderId, order);
        this.productsPrice = order.productsPrice;
        this.orderItems = order.items;
    }

    async onDelete() {
        await lastValueFrom(this._ordersService.delete(this.order.orderId));
        this._router.navigateByUrl('/admin/orders');
    }

    async onSubmit() {
        await lastValueFrom(this._ordersService.update(this.order));
        this._router.navigateByUrl('/admin/orders');
    }

    getTotal() {
        return this.productsPrice + this.order.deliveryPrice;
    }

    onAddressChange(newAddress: string) {
        this.order.address = newAddress;
    }

    onDeliveryPriceChange(newDeliveryPrice: number) {
        this.order.deliveryPrice = newDeliveryPrice;
    }

    private mapToUpdateOrderRequest(orderId: string, order: OrderDetailsResponse): UpdateOrderRequest {
        return {
            orderId: orderId,
            firstName: order.firstName,
            lastName: order.lastName,
            email: order.email,
            tel: order.tel,
            address: order.address,
            status: order.status,
            deliveryPrice: order.deliveryPrice
        };
    }
}
