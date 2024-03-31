import { Image } from "./image";
import { Size } from "./size";

export class Artwork {
    id = '';
    title = '';
    description = '';
    price = 0;
    sizes: Size[] = [];
    images: Image[] = [];
}