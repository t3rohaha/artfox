import { CommonModule }                                     from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output }   from '@angular/core';
import { FormsModule }                                      from '@angular/forms';
import { lastValueFrom }                                    from 'rxjs';
import { EcontOfficeSelectComponent }                       from '../econt-office-select/econt-office-select.component';
import { EcontService }                                     from '../../../services/econt.service';

@Component({
    selector: 'app-econt-delivery',
    standalone: true,
    templateUrl: './econt-delivery.component.html',
    styleUrl: './econt-delivery.component.css',
    imports: [CommonModule, FormsModule, EcontOfficeSelectComponent]
})
export class EcontDeliveryComponent implements OnInit {

    OFFICE_DELIVERY_PRICE = 6.04;
    ADDRESS_DELIVERY_PRICE = 7.61;

    @Input() address!: string;
    @Output() addressChange = new EventEmitter<string>();
    @Output() deliveryPriceChange = new EventEmitter<number>();

    deliveryPrice = this.OFFICE_DELIVERY_PRICE;
    toOffice = true;
    offices: string[] = [];

    constructor(private _econtService: EcontService) {}

    async ngOnInit(): Promise<void> {
        this.offices = await lastValueFrom(this._econtService.getOffices());
        this.setInitialDeliveryPrice();
    }

    onAddressInput(address: string) {
        this.address = address;
        this.addressChange.emit(this.address);
    }

    onOfficeSelect(office: string): void {
        this.address = office;
        this.addressChange.emit(this.address);
    }

    onDeliveryPriceChange(): void {

        this.toOffice = !this.toOffice;

        if (this.toOffice) {
            this.deliveryPrice = this.OFFICE_DELIVERY_PRICE;
        } else {
            this.deliveryPrice = this.ADDRESS_DELIVERY_PRICE;
        }
        
        this.deliveryPriceChange.emit(this.deliveryPrice);
        this.onAddressInput('');
    }

    private setInitialDeliveryPrice(): void {
        if (this.address === '') {
            this.deliveryPriceChange.emit(this.deliveryPrice);
            return;
        }
        if (!this.offices.includes(this.address)) {
            const tempAddress = this.address;
            this.onDeliveryPriceChange();
            this.onAddressInput(tempAddress);
        }
    }
}
