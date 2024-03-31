import { Component, OnInit }    from '@angular/core';
import { CommonModule }         from '@angular/common';
import { CartsService }         from '../../../services/carts.service';

@Component({
    selector: 'app-cart-icon',
    standalone: true,
    templateUrl: './cart-icon.component.html',
    styleUrl: './cart-icon.component.css',
    imports: [CommonModule]
})
export class CartIconComponent implements OnInit {
    
    itemsCount = 0;

    constructor(private _cartsService: CartsService) {}

    ngOnInit() {
        this._cartsService.items$.subscribe(items => this.itemsCount = items.length);
    }
}
