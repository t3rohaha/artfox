import { Component }        from '@angular/core';
import { FormsModule }      from '@angular/forms';
import { Router }           from '@angular/router';
import { lastValueFrom }    from 'rxjs';
import { AuthService }      from '../../services/auth.service';
import { LoginRequest }     from '../../services/requests/auth/login.request';

@Component({
    selector: 'app-login',
    standalone: true,
    templateUrl: './login.component.html',
    styleUrl: './login.component.css',
    imports: [FormsModule],
})
export class LoginComponent {

    login = new LoginRequest;

    constructor(
        private _authService: AuthService,
        private _router: Router
    ) {}

    async onSubmit() {
        const response = await lastValueFrom(this._authService.login(this.login));
        this._authService.saveToken(response.token);
        this._router.navigateByUrl('/admin');
    }
}
