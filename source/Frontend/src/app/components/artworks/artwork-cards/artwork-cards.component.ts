import { Component, Input, SimpleChanges }  from '@angular/core';
import { RouterModule }                     from '@angular/router';
import { Artwork }                          from '../../../models/artwork';
import { BlobToUrlPipe }                    from '../../../utils/blob-to-url.pipe';
import { CartsService }                     from '../../../services/carts.service';
import { ArtworkResponse }                  from '../../../services/responses/artworks/artwork.response';
import { ImagesService }                    from '../../../services/images.service';

@Component({
    selector: 'app-artwork-cards',
    standalone: true,
    templateUrl: './artwork-cards.component.html',
    styleUrl: './artwork-cards.component.css',
    imports: [BlobToUrlPipe, RouterModule],
})
export class ArtworkCardsComponent {

    @Input() artworksResponse: ArtworkResponse[] = [];
    artworks: Artwork[] = [];

    constructor(
        private _cartsService: CartsService,
        private _imagesService: ImagesService
    ) {}

    ngOnChanges(changes: SimpleChanges) {
        if (changes['artworksResponse']) {
          this.artworks = this.mapArtworks(this.artworksResponse);
        }
    }

    addToCart(event: Event, itemId: string): void {
        event.preventDefault();
        event.stopPropagation();
        this._cartsService.addToCart({itemId, quantity: 1});
    }

    private mapArtworks(artworkResponseArray: ArtworkResponse[]): Artwork[] {
        const artworks = [];
        for (let a of artworkResponseArray) {
            artworks.push({
                id: a.id,
                title: a.title,
                description: '',
                price: a.price,
                sizes: [],
                images: [{
                    imageId: a.images[0].imageId,
                    artworkId: a.images[0].artworkId,
                    imageData: this._imagesService.convertBase64StringToBlob(a.images[0].imageData),
                    displayOrder: a.images[0].displayOrder,
                }]
            });
        }
        return artworks;
    }
}
