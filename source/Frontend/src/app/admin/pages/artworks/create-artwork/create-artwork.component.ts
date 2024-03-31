import { CommonModule }             from '@angular/common';
import { Component }                from '@angular/core';
import { FormsModule }              from '@angular/forms';
import { Router }                   from '@angular/router';
import { lastValueFrom }            from 'rxjs';
import { UpdateImagesComponent }    from '../../../components/update-images/update-images.component';
import { UpdateSizesComponent }     from '../../../components/update-sizes/update-sizes.component';
import { AdminArtworksService }     from '../../../services/admin-artworks.service';
import { AdminImagesService }       from '../../../services/admin-images.service';
import { CreateArtworkRequest }     from '../../../../services/requests/artworks/create-artwork.request';
import { UpdateImagesRequest }      from '../../../../services/requests/images/update-images.request';

@Component({
    selector: 'app-create-artwork',
    standalone: true,
    templateUrl: './create-artwork.component.html',
    styleUrl: './create-artwork.component.css',
    imports: [
        CommonModule,
        FormsModule,
        UpdateImagesComponent,
        UpdateSizesComponent
    ]
})
export class CreateArtworkComponent {

    artwork = new CreateArtworkRequest;
    imagesRequest = new UpdateImagesRequest;

    constructor(
        private _artworksService: AdminArtworksService,
        private _imagesService: AdminImagesService,
        private _router: Router
    ) { }

    async onSubmit() {
        if (this.imagesRequest.images.length > 0) {
            const artworkResponse = await lastValueFrom(this._artworksService.create(this.artwork));
            this.imagesRequest.artworkId = artworkResponse.id;
            await lastValueFrom(this._imagesService.updateImages(this.imagesRequest));
            this._router.navigateByUrl('/admin/artworks');
        } else {
            alert('Добави заглавна снимка.');
        }
    }
}
