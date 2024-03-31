import { UpdateImageRequest } from "./update-image.request";

export class UpdateImagesRequest {
    artworkId: string = '';
    images: UpdateImageRequest[] = [];
}