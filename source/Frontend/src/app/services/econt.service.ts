import { HttpClient, HttpHeaders }  from '@angular/common/http';
import { Injectable }               from '@angular/core';
import { Observable, map }          from 'rxjs';
import { OfficesResponse }          from './responses/econt/offices.response';
import { environment }              from '../../environments/environment';

@Injectable({providedIn: 'root'})
export class EcontService {

    protected baseUrl = environment.artfox.apiUrl + '/econt';

    constructor(private http: HttpClient) {}

    getOffices(): Observable<string[]> {
        return this.http.get<string[]>(this.baseUrl + '/offices');
    }
}

