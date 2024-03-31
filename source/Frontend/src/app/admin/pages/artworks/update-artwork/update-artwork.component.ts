import { CommonModule }             from '@angular/common';
import { Component, OnInit }        from '@angular/core';
import { FormsModule }              from '@angular/forms';
import { ActivatedRoute, Router }   from '@angular/router';
import { lastValueFrom }            from 'rxjs';
import { UpdateImagesComponent }    from '../../../components/update-images/update-images.component';
import { UpdateSizesComponent }     from '../../../components/update-sizes/update-sizes.component';
import { AdminArtworksService }     from '../../../services/admin-artworks.service';
import { AdminImagesService }       from '../../../services/admin-images.service';
import { ImageResponse }            from '../../../../services/responses/images/image.response';
import { UpdateArtworkRequest }     from '../../../../services/requests/artworks/update-artwork.request';
import { UpdateImagesRequest }      from '../../../../services/requests/images/update-images.request';

@Component({
    selector: 'app-update-artwork',
    standalone: true,
    templateUrl: './update-artwork.component.html',
    styleUrl: './update-artwork.component.css',
    imports: [
        CommonModule,
        FormsModule, 
        UpdateImagesComponent, 
        UpdateSizesComponent
    ]
})
export class UpdateArtworkComponent implements OnInit {

    artwork!: UpdateArtworkRequest;
    imagesRequest!: UpdateImagesRequest;

    constructor(
        private _artworksService: AdminArtworksService,
        private _imagesService: AdminImagesService,
        private _router: Router,
        private _route: ActivatedRoute
    ) { }

    async ngOnInit() {
        const artworkId = this._route.snapshot.paramMap.get('id')!;
        this.artwork = await lastValueFrom(this._artworksService.get(artworkId));
        const imagesResponse = await lastValueFrom(this._imagesService.get(artworkId));
        this.imagesRequest = this.mapToUpdateImagesRequest(artworkId, imagesResponse);
    }

    async onDelete() {
        await lastValueFrom(this._artworksService.delete(this.artwork.id));
        this._router.navigateByUrl('/admin/artworks');
    }

    async onSubmit() {
        if(this.imagesRequest.images.length > 0) {
            await lastValueFrom(this._artworksService.update(this.artwork));
            await lastValueFrom(this._imagesService.updateImages(this.imagesRequest));
            this._router.navigateByUrl('/admin/artworks');
        } else {
            alert('Добави заглавна снимка.');
        }
    }

    private mapToUpdateImagesRequest(artworkId: string, images: ImageResponse[]): UpdateImagesRequest {
        const updateImagesRequest: UpdateImagesRequest = { artworkId: artworkId, images: [] };
        for(let image of images) {
            const blob = this._imagesService.convertBase64StringToBlob(image.imageData);
            updateImagesRequest.images.push({
                imageData: new File([blob], 'image', { type: 'image/jpeg' }),
                displayOrder: image.displayOrder
            });
        }
        return updateImagesRequest;
    }
}