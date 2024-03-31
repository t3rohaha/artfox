import { Component, Input, OnChanges, SimpleChanges }       from '@angular/core';
import { Gallery, GalleryItem, GalleryModule, ImageItem }   from 'ng-gallery';
import { GallerizeDirective }                               from 'ng-gallery/lightbox'
import { Image }                                            from '../../../models/image';
import { ImageResponse }                                    from '../../../services/responses/images/image.response';

@Component({
    selector: 'app-image-gallery',
    standalone: true,
    templateUrl: './image-gallery.component.html',
    styleUrl: './image-gallery.component.css',
    imports: [GalleryModule, GallerizeDirective]
})
export class ImageGalleryComponent implements OnChanges {

    @Input() imagesResponse: ImageResponse[] = [];
    images: Image[] = [];
    galleryItems: GalleryItem[] = [];

    constructor(gallery: Gallery) {
        gallery.ref('myGallery').setConfig({thumb: false})
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['imagesResponse']) {

            this.imagesResponse.map(imageRes => 
                this.images.push(Image.mapFrom(imageRes))
            );

            this.images = this.images.sort((a, b) => a.displayOrder - b.displayOrder);

            this.images.map(image => {
                const imageUrl = URL.createObjectURL(image.imageData);
                this.galleryItems.push(new ImageItem({src: imageUrl, thumb: imageUrl}));
            });
        }
    }
}
