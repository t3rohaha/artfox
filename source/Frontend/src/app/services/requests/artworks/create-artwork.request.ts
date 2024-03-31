import { SizeRequest } from "./size.request";

export class CreateArtworkRequest {
    title: string = '';
    description: string = '';
    price: number = 0;
    sizes: SizeRequest[] = [];
}