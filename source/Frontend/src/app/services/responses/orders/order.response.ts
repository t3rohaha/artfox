export interface OrderResponse {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    tel: string;
    address: string;
    deliveryPrice: number;
    productsPrice: number;
    totalPrice: number;
    status: string;
    createdAt: string;
    modifiedAt: string;
}