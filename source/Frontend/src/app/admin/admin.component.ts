import { Component }        from '@angular/core';
import { NavbarComponent }  from './components/navbar/navbar.component';
import { RouterOutlet }     from '@angular/router';


@Component({
    selector: 'app-admin',
    standalone: true,
    templateUrl: './admin.component.html',
    styleUrl: './admin.component.css',
    imports: [NavbarComponent, RouterOutlet]
})
export class AdminComponent {

}
