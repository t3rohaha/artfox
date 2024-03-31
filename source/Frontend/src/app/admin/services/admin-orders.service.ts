import { HttpClient }           from "@angular/common/http";
import { Injectable }           from "@angular/core";
import { Observable }           from "rxjs";
import { OrdersService }        from "../../services/orders.service";
import { OrderResponse }        from "../../services/responses/orders/order.response";
import { UpdateOrderRequest }   from "../../services/requests/orders/update-order.request";
import { OrderDetailsResponse } from "../../services/responses/orders/order-details.response";
import { environment }          from "../../../environments/environment";

@Injectable({providedIn: 'root'})
export class AdminOrdersService extends OrdersService {

    constructor(http: HttpClient) { 
        super(http);
        this.baseUrl = environment.artfox.apiUrl + '/admin/orders';
    }

    delete(id: string): Observable<any> {
        return this.http.delete<any>(`${this.baseUrl}/${id}`);
    }

    get(id: string): Observable<OrderDetailsResponse> {
        return this.http.get<OrderDetailsResponse>(`${this.baseUrl}/${id}`);
    }

    getAll(): Observable<OrderResponse[]> {
        return this.http.get<OrderResponse[]>(this.baseUrl);
    }

    update(input: UpdateOrderRequest): Observable<OrderResponse> {
        return this.http.put<OrderResponse>(this.baseUrl, input);
    }
}