import { CommonModule }         from '@angular/common';
import { Component, OnInit }    from '@angular/core';
import { Router }               from '@angular/router';
import { lastValueFrom }        from 'rxjs';
import { AdminOrdersService }   from '../../../services/admin-orders.service';
import { OrderResponse }        from '../../../../services/responses/orders/order.response';

@Component({
    selector: 'app-get-orders',
    standalone: true,
    templateUrl: './get-orders.component.html',
    styleUrl: './get-orders.component.css',
    imports: [CommonModule]
})
export class GetOrdersComponent implements OnInit {

    orders: OrderResponse[] = [];

    constructor(
        private ordersService: AdminOrdersService,
        private router: Router
    ) { }

    async ngOnInit() {
        this.orders = await lastValueFrom(this.ordersService.getAll());
        this.orders.sort((a, b) => this.compareDates(b.createdAt, a.createdAt));
    }

    redirectToEdit(orderId: string) {
        this.router.navigateByUrl(`/admin/orders/edit/${orderId}`);
    }

    getStatusColor(status: string): string {
        switch (status) {
            case 'Pending':
                return 'orange';
            case 'Sent':
                return 'blue';
            case 'Completed':
                return 'green';
            case 'Cancelled':
                return 'red';
            default:
                return 'inherit';
        }
    }

    private compareDates(a: string, b: string) {
        if (a > b)
            return 1;
        if (a < b)
            return -1;
        else
            return 0;
    }
}
