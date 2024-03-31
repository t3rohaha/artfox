import { CommonModule }         from '@angular/common';
import { Component, Input }     from '@angular/core';
import { UpdateImageRequest }   from '../../../services/requests/images/update-image.request';
import { FileToUrlPipe }        from '../../../utils/file-to-url.pipe'

@Component({
    selector: 'app-update-images',
    standalone: true,
    templateUrl: './update-images.component.html',
    styleUrl: './update-images.component.css',
    imports: [CommonModule, FileToUrlPipe],
})
export class UpdateImagesComponent {

    @Input() images: UpdateImageRequest[] = [];

    onImageUpload(event: any): void {
        this.images.push({
            imageData: event.target.files[0],
            displayOrder: this.images.length
        });
    }

    onImageDelete(index: number): void {
        this.images.splice(index, 1);
        this.updateDisplayOrder();
    }

    onImageDisplayOrderChange(index: number, newIndex: number): void {
        
        if (newIndex < 0 || newIndex > this.images.length - 1) {
            return;
        }

        const image = this.images.splice(index, 1)[0];
        this.images.splice(newIndex, 0, image);
        this.updateDisplayOrder();
    }

    orderedImages(): UpdateImageRequest[] {
        return this.images.sort((a, b) => a.displayOrder - b.displayOrder);
    }

    private updateDisplayOrder(): void {
        var displayOrder = 0;
        this.images.forEach(x => x.displayOrder = displayOrder++);
    }
}
