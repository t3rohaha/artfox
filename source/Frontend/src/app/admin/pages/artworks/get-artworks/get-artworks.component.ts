import { Component, OnInit }    from '@angular/core';
import { lastValueFrom }        from 'rxjs';
import { Router }               from '@angular/router';
import { AdminArtworksService } from '../../../services/admin-artworks.service';
import { ArtworkResponse }      from '../../../../services/responses/artworks/artwork.response';

@Component({
    selector: 'app-get-artworks',
    standalone: true,
    templateUrl: './get-artworks.component.html',
    styleUrl: './get-artworks.component.css'
})
export class GetArtworksComponent implements OnInit {

    artworks: ArtworkResponse[] = [];

    constructor(
        private artworksService: AdminArtworksService,
        private router: Router
    ) { }

    async ngOnInit() {
        this.artworks = await lastValueFrom(this.artworksService.getAll());
    }

    redirectToEdit(artworkId: string) {
        this.router.navigateByUrl(`/admin/artworks/edit/${artworkId}`);
    }
}
