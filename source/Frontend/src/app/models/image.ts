import { ImageResponse } from "../services/responses/images/image.response";

export class Image {
    
    imageId = '';
    artworkId = '';
    imageData = new Blob();
    displayOrder = 0;

    static mapFrom(imageResponse: ImageResponse): Image {
        return {
            imageId: imageResponse.imageId,
            artworkId: imageResponse.artworkId,
            imageData: this.convertBase64StringToBlob(imageResponse.imageData),
            displayOrder: imageResponse.displayOrder
        }
    }

    static convertBase64StringToBlob(base64String: string): Blob {
        const bytesString = atob(base64String);
        const bytesArray = bytesString.split('').map(x => x.charCodeAt(0));
        const blob = new Blob([new Uint8Array(bytesArray)], { type: 'image/jpeg' });
        return blob;
    }
}