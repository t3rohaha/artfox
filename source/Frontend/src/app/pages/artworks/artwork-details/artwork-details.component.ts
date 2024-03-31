import { CommonModule }                 from '@angular/common';
import { Component, OnInit }            from '@angular/core';
import { ActivatedRoute, Router }       from '@angular/router';
import { Observable, lastValueFrom }                from 'rxjs';
import { GetRandomArtworksComponent }   from '../../../components/artworks/get-random-artworks/get-random-artworks';
import { ImageGalleryComponent }        from '../../../components/images/image-gallery/image-gallery.component';
import { ArtworksService }              from '../../../services/artworks.service';
import { CartsService }                 from '../../../services/carts.service';
import { ArtworkResponse }              from '../../../services/responses/artworks/artwork.response';
import { BlobToUrlPipe }                from '../../../utils/blob-to-url.pipe';

@Component({
    selector: 'app-artwork-details',
    standalone: true,
    templateUrl: './artwork-details.component.html',
    styleUrl: './artwork-details.component.css',
    imports: [
        BlobToUrlPipe,
        CommonModule,
        GetRandomArtworksComponent,
        ImageGalleryComponent
    ],
})
export class ArtworkDetailsComponent implements OnInit {

    artworkResponse = new ArtworkResponse;
    quantity = 1;

    constructor(
        private _artworksService: ArtworksService,
        private _cartsService: CartsService,
        private _route: ActivatedRoute,
        private _router: Router
    ) {}

    async ngOnInit() {
        const artworkId = this._route.snapshot.paramMap.get('id')!;
        this.artworkResponse = await lastValueFrom(this._artworksService.get(artworkId));
    }

    addToCart() {
        this._cartsService.addToCart({
            itemId: this.artworkResponse.id,
            quantity: this.quantity
        });
    }

    buy() {
        this.addToCart();

        const subscription = this._cartsService.items$
        .subscribe(items => {
            if(items.find(x => x.id == this.artworkResponse.id)) {
                this._router.navigateByUrl('/order');
                subscription.unsubscribe();
            }
            
        });
    }

    async setQuantity(quantity: number) {
        if (quantity > 0) {
            this.quantity = quantity;
        }
    }
}
