import { HttpClient }           from "@angular/common/http";
import { Injectable }           from "@angular/core";
import { Observable }           from "rxjs";
import { ArtworksService }      from "../../services/artworks.service";
import { ArtworkResponse }      from "../../services/responses/artworks/artwork.response";
import { CreateArtworkRequest } from "../../services/requests/artworks/create-artwork.request";
import { UpdateArtworkRequest } from "../../services/requests/artworks/update-artwork.request";
import { environment }          from "../../../environments/environment";

@Injectable({providedIn: 'root'})
export class AdminArtworksService extends ArtworksService {

    constructor(http: HttpClient) { 
        super(http);
        this.baseUrl = environment.artfox.apiUrl + '/admin/artworks';
    }

    create(data: CreateArtworkRequest): Observable<ArtworkResponse> {
        return this.http.post<ArtworkResponse>(this.baseUrl, data);
    }

    delete(id: string): Observable<any> {
        return this.http.delete<any>(`${this.baseUrl}/${id}`);
    }

    update(data: UpdateArtworkRequest): Observable<ArtworkResponse> {
        return this.http.put<ArtworkResponse>(this.baseUrl, data);
    }
}