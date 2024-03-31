import { HttpEvent, HttpHandlerFn, HttpRequest }    from "@angular/common/http";
import { Observable }                               from "rxjs";
import { environment }                              from "../../environments/environment";

export function authInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {

    const token = localStorage.getItem('auth_token');
    const isApiUrl = req.url.startsWith(environment.artfox.apiUrl);

    let authReq = req;
    if (isApiUrl) {
        authReq = req.clone({
            setHeaders: token ? { Authorization: 'Bearer ' + token } : {},
            withCredentials: true
        });
    }

    return next(authReq);
}