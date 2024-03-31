import { ImageResponse }    from "../images/image.response";
import { SizeResponse }     from "./size.response";

export class ArtworkResponse {
    id = '';
    title = '';
    description = '';
    price = 0;
    sizes: SizeResponse[] = [];
    images: ImageResponse[] = [];
}