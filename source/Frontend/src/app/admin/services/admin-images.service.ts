import { HttpClient }           from "@angular/common/http";
import { Injectable }           from "@angular/core";
import { Observable }           from "rxjs";
import { ImagesService }        from "../../services/images.service";
import { ImageResponse }        from "../../services/responses/images/image.response";
import { UpdateImagesRequest }  from "../../services/requests/images/update-images.request";
import { environment }          from "../../../environments/environment";

@Injectable({providedIn: 'root'})
export class AdminImagesService extends ImagesService {

    constructor(http: HttpClient) { 
        super(http);
        this.baseUrl = environment.artfox.apiUrl + '/admin/images';
    }

    updateImages(data: UpdateImagesRequest): Observable<ImageResponse[]> {
        const formData = this.mapToFormData(data);
        return this._http.post<ImageResponse[]>(this.baseUrl, formData);
    }

    private mapToFormData(data: UpdateImagesRequest): FormData {
        const formData = new FormData();
        formData.append('artworkId', data.artworkId);
        for (let i in data.images) {
            formData.append(`images[${i}].ImageData`, data.images[i].imageData);
            formData.append(`images[${i}].DisplayOrder`, data.images[i].displayOrder.toString());
        }
        return formData;
    }
}