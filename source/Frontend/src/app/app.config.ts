import { ApplicationConfig }                    from '@angular/core';
import { provideHttpClient, withInterceptors }  from '@angular/common/http';
import { provideRouter }                        from '@angular/router';
import { provideAnimationsAsync }               from '@angular/platform-browser/animations/async';
import { LIGHTBOX_CONFIG, LightboxConfig }      from 'ng-gallery/lightbox';
import { routes }                               from './app.routes';
import { authInterceptor }                      from './utils/auth.interceptor';


export const appConfig: ApplicationConfig = {
    providers: [
        provideHttpClient(withInterceptors([authInterceptor])),
        provideAnimationsAsync(),
        provideRouter(routes),
        {
            provide: LIGHTBOX_CONFIG,
            useValue: {
              panelClass: 'fullscreen'
            } as LightboxConfig
        }
    ]
};
