import { HttpClient }       from "@angular/common/http";
import { Injectable }       from "@angular/core";
import { Observable }       from "rxjs";
import { ContactsResponse } from "./responses/contacts/contacts.response";
import { ContactsRequest }  from "./requests/contacts/contacts.request";
import { environment }      from "../../environments/environment";

@Injectable({providedIn: 'root'})
export class ContactsService {

    protected baseUrl = environment.artfox.apiUrl + '/contacts';

    constructor(private _http: HttpClient) { }

    create(input: ContactsRequest): Observable<ContactsResponse> {
        return this._http.post<ContactsResponse>(this.baseUrl, input);
    }
}
