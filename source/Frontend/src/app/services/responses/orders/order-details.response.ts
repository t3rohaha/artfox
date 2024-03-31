import { OrderItemResponse } from "./order-item.response";
import { OrderResponse } from "./order.response";

export interface OrderDetailsResponse extends OrderResponse {
    items: OrderItemResponse[];
}