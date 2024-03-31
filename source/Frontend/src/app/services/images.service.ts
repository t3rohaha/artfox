import { HttpClient }       from '@angular/common/http';
import { Injectable }       from '@angular/core';
import { Observable }       from 'rxjs';
import { ImageResponse }    from './responses/images/image.response';
import { environment }      from '../../environments/environment';

@Injectable({providedIn: 'root'})
export class ImagesService {

    protected baseUrl = environment.artfox.apiUrl + '/images';

    constructor(protected _http: HttpClient) { }

    get(artworkId: string): Observable<ImageResponse[]> {
        return this._http.get<ImageResponse[]>(`${this.baseUrl}/${artworkId}`);
    }

    getMainImage(artworkId: string): Observable<ImageResponse> {
        return this._http.get<ImageResponse>(`${this.baseUrl}/main/${artworkId}`);
    }

    convertBase64StringToBlob(base64String: string): Blob {
        const bytesString = atob(base64String);
        const bytesArray = bytesString.split('').map(x => x.charCodeAt(0));
        const blob = new Blob([new Uint8Array(bytesArray)], { type: 'image/jpeg' });
        return blob;
    }
}
