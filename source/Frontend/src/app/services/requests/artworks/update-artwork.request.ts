import { SizeRequest } from "./size.request";

export class UpdateArtworkRequest {
    id: string = '';
    title: string = '';
    description: string = '';
    price: number = 0;
    sizes: SizeRequest[] = [];
}