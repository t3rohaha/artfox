import { HttpClient }           from "@angular/common/http";
import { Injectable }           from "@angular/core";
import { Observable }           from "rxjs";
import { OrderResponse }        from "./responses/orders/order.response";
import { CreateOrderRequest }   from "./requests/orders/create-order.request";
import { environment }          from "../../environments/environment";

@Injectable({providedIn: 'root'})
export class OrdersService {

    protected baseUrl = environment.artfox.apiUrl + '/orders';

    constructor(protected http: HttpClient) {}

    create(input: CreateOrderRequest): Observable<OrderResponse> {
        return this.http.post<OrderResponse>(this.baseUrl, input);
    }
}
