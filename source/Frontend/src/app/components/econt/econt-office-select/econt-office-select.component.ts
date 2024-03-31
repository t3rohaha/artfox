import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormsModule }                                                      from '@angular/forms';

@Component({
    selector: 'app-econt-office-select',
    standalone: true,
    templateUrl: './econt-office-select.component.html',
    styleUrl: './econt-office-select.component.css',
    imports: [FormsModule]
})
export class EcontOfficeSelectComponent implements OnChanges {

    @Input() offices!: string[];
    @Output() selectOfficeEvent = new EventEmitter<string>();
    officesFiltered: string[] = [];

    ngOnChanges(changes: SimpleChanges) {
        if (changes['offices']) {
            this.officesFiltered = this.offices;
        }
    }

    filterOffices(event: Event): void {
        const input = event.target as HTMLInputElement;
        const normalizedSearchTerm = input.value.trim().toLowerCase();
        const searchTerms = normalizedSearchTerm.split(/\s+/);

        this.officesFiltered = this.offices.filter(x => {
            const normalizedOffice = x.trim().toLowerCase();
            const officeWords = normalizedOffice.split(/\s+/);
            return searchTerms.every(searchTerm => 
                officeWords.some(officeWord => officeWord.includes(searchTerm))
            );
        });
    }

    selectOffice(office: string) {
        this.selectOfficeEvent.emit(office);
    }
}
