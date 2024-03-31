import { CommonModule }         from '@angular/common';
import { Component, OnInit }    from '@angular/core';
import { RouterModule }         from '@angular/router';
import { Observable, map }      from 'rxjs';
import { CartItem }             from '../../../models/cart-item';
import { CartsService }         from '../../../services/carts.service';
import { ImagesService }        from '../../../services/images.service';
import { BlobToUrlPipe }        from '../../../utils/blob-to-url.pipe';
import { CartItemResponse }     from '../../../services/responses/carts/cart-item.response';

@Component({
    selector: 'app-cart-modal',
    standalone: true,
    templateUrl: './cart-modal.component.html',
    styleUrl: './cart-modal.component.css',
    imports: [BlobToUrlPipe, CommonModule, RouterModule]
})
export class CartModalComponent implements OnInit {
    
    items$ = new Observable<CartItem[]>;
    total = 0;

    constructor(
        private _cartsService: CartsService,
        private _imagesService: ImagesService
    ) {}

    ngOnInit(): void {
        this.items$ = this._cartsService.items$
        .pipe(map(items => this.mapCartItems(items)));

        this.items$
        .pipe(map(items => this.getTotal(items)))
        .subscribe(total => this.total = total);
    }

    deleteFromCart(itemId: string) {
        this._cartsService.deleteFromCart(itemId);
    }

    setQuantity(itemId: string, quantity: number) {
        if (quantity > 0) {
            this._cartsService.updateItem({itemId, quantity});
        }
    }

    private getTotal(items: CartItem[]): number {
        let total = 0;
        for (let item of items) {
            total += item.price * item.quantity;
        }
        return total;
    }

    private mapCartItems(cartItemDTOs: CartItemResponse[]): CartItem[] {
        const items = [];
        for(let x of cartItemDTOs) {
            items.push({
                id: x.id,
                title: x.title,
                price: x.price,
                imageData: this._imagesService.convertBase64StringToBlob(x.imageData),
                quantity: x.quantity
            });
        }
        return items;
    }
}
