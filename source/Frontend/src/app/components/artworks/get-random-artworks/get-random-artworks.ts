import { Component, Input, OnInit } from '@angular/core';
import { RouterModule }             from '@angular/router';
import { lastValueFrom }            from 'rxjs';
import { ArtworkCardsComponent }    from '../artwork-cards/artwork-cards.component';
import { ArtworksService }          from '../../../services/artworks.service';
import { ArtworkResponse }          from '../../../services/responses/artworks/artwork.response';

@Component({
    selector: 'app-get-random-artworks',
    standalone: true,
    templateUrl: './get-random-artworks.html',
    styleUrl: './get-random-artworks.css',
    imports: [ArtworkCardsComponent, RouterModule]
})
export class GetRandomArtworksComponent implements OnInit {

    @Input() title = '';
    artworks: ArtworkResponse[] = [];

    constructor(private _artworksService: ArtworksService) {}

    async ngOnInit() {
        this.artworks = await lastValueFrom(this._artworksService.getRandom());
    }
}
