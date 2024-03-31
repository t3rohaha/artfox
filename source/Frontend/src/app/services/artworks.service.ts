import { Injectable }               from '@angular/core';
import { HttpClient }               from '@angular/common/http';
import { Observable }               from 'rxjs';
import { ArtworkResponse }          from './responses/artworks/artwork.response';
import { environment }              from '../../environments/environment';

@Injectable({providedIn: 'root'})
export class ArtworksService {

    protected baseUrl = environment.artfox.apiUrl + '/artworks';

    constructor(protected http: HttpClient) { }

    get(id: string): Observable<ArtworkResponse> {
        return this.http.get<ArtworkResponse>(`${this.baseUrl}/${id}`);
    }

    getAll(): Observable<ArtworkResponse[]> {
        return this.http.get<ArtworkResponse[]>(this.baseUrl);
    }

    getRandom(): Observable<ArtworkResponse[]> {
        return this.http.get<ArtworkResponse[]>(`${this.baseUrl}/random/4`);
    }
}
