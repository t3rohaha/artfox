import { Component, OnInit }        from '@angular/core';
import { lastValueFrom }            from 'rxjs';
import { ArtworkCardsComponent }    from '../../../components/artworks/artwork-cards/artwork-cards.component';
import { ArtworksService }          from '../../../services/artworks.service';
import { ArtworkResponse }          from '../../../services/responses/artworks/artwork.response';

@Component({
    selector: 'app-get-artworks',
    standalone: true,
    templateUrl: './get-artworks.component.html',
    styleUrl: './get-artworks.component.css',
    imports: [ArtworkCardsComponent]
})
export class GetArtworksComponent implements OnInit {

    artworks: ArtworkResponse[] = [];
    artworksShown: ArtworkResponse[] = [];
    totalPages = 0;
    currentPage = 0;
    pageSize = 12;

    constructor(private _artworksService: ArtworksService) {}

    async ngOnInit() {
        this.artworks = await lastValueFrom(this._artworksService.getAll());
        this.totalPages = Math.ceil(this.artworks.length / this.pageSize);
        this.setPage(0);
    }

    nextPage(): void {
        if (this.currentPage < this.totalPages - 1)
            this.setPage(this.currentPage + 1);
    }
    
    prevPage(): void {
        if (this.currentPage > 0)
            this.setPage(this.currentPage - 1);
    }

    private setPage(page: number): void {
        this.currentPage = page;
        const start = this.currentPage * this.pageSize;
        const end = start + this.pageSize;
        this.artworksShown = this.artworks.slice(start, end);
    }
}
