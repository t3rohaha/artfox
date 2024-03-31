import { CommonModule }         from '@angular/common';
import { Component }            from '@angular/core';
import { RouterModule }         from '@angular/router';
import { CartIconComponent }    from '../cart/cart-icon/cart-icon.component';

@Component({
    selector: 'app-navbar',
    standalone: true,
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.css',
    imports: [ CommonModule, CartIconComponent, RouterModule ]
})
export class NavbarComponent {
    isMenuOpen = false;
}
