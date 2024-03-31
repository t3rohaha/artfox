import { Component, Input } from '@angular/core';
import { CommonModule }     from '@angular/common';
import { FormsModule }      from '@angular/forms';
import { SizeResponse }     from '../../../services/responses/artworks/size.response';

@Component({
    selector: 'app-update-sizes',
    standalone: true,
    templateUrl: './update-sizes.component.html',
    styleUrl: './update-sizes.component.css',
    imports: [CommonModule, FormsModule]
})
export class UpdateSizesComponent {

    @Input() sizes: SizeResponse[] = [];
    widthInput: number | null = null;
    heightInput: number | null = null;

    onSizeCreate(): void {
        if (this.widthInput && this.heightInput) {
            this.sizes.push({ width: this.widthInput!, height: this.heightInput! });
            this.widthInput = null;
            this.heightInput = null;
        }
    }

    onSizeDelete(index: number): void {
        this.sizes.splice(index, 1);
    }
}
