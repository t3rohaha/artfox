import { HttpClient }                           from '@angular/common/http';
import { Injectable }                           from '@angular/core';
import { BehaviorSubject, Observable }          from 'rxjs';
import { CartItemResponse }                     from './responses/carts/cart-item.response';
import { AddItemRequest }                       from './requests/carts/add-item.request';
import { UpdateItemRequest }                    from './requests/carts/update-item.request';
import { environment }                          from '../../environments/environment';

@Injectable({providedIn: 'root'})
export class CartsService {

    protected baseUrl = environment.artfox.apiUrl + '/carts';

    private _itemsSubject = new BehaviorSubject<CartItemResponse[]>([]);

    constructor(private _http: HttpClient) {
        this.get().subscribe(items => this._itemsSubject.next(items));
    }

    get items$(): Observable<CartItemResponse[]> {
        return this._itemsSubject.asObservable();
    }

    addToCart(data: AddItemRequest) {
        this._http.put<CartItemResponse[]>(`${this.baseUrl}/addItem`, data)
        .subscribe(items => this._itemsSubject.next(items));
    }

    deleteFromCart(itemId: string) {
        this._http.delete<CartItemResponse[]>(`${this.baseUrl}/deleteItem/${itemId}`)
        .subscribe(items => this._itemsSubject.next(items));
    }

    resetItemsSubject() {
        this._itemsSubject.next([]);
    }

    updateItem(data: UpdateItemRequest) {
        this._http.put<CartItemResponse[]>(`${this.baseUrl}/updateItem`, data)
        .subscribe(items => this._itemsSubject.next(items));
    }

    private get(): Observable<CartItemResponse[]> {
        return this._http.get<CartItemResponse[]>(this.baseUrl);
    }
}
