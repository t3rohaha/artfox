import { Component }                    from '@angular/core';
import { GetRandomArtworksComponent }   from '../../components/artworks/get-random-artworks/get-random-artworks';

@Component({
    selector: 'app-index',
    standalone: true,
    templateUrl: './index.component.html',
    styleUrl: './index.component.css',
    imports: [GetRandomArtworksComponent]
})
export class IndexComponent { }
