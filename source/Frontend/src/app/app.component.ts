import { Component }            from '@angular/core';
import { CommonModule }         from '@angular/common';
import { RouterOutlet }         from '@angular/router';
import { CartModalComponent }   from './components/cart/cart-modal/cart-modal.component';
import { NavbarComponent }      from './components/navbar/navbar.component';
import { AlertComponent } from './components/alert/alert.component';


@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [
        AlertComponent,
        CartModalComponent,
        CommonModule,
        RouterOutlet,
        NavbarComponent
    ]
})
export class AppComponent {
    title = 'ArtFox';
}
