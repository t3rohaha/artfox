import { CommonModule }     from '@angular/common';
import { Component }        from '@angular/core';
import { FormsModule }      from '@angular/forms';
import { Router }           from '@angular/router';
import { lastValueFrom }    from 'rxjs';
import { AlertService }     from '../../services/alert.service';
import { ContactsService }  from '../../services/contacts.service';
import { ContactsRequest }  from '../../services/requests/contacts/contacts.request';


@Component({
    selector: 'app-contacts',
    standalone: true,
    templateUrl: './contacts.component.html',
    styleUrl: './contacts.component.css',
    imports: [CommonModule, FormsModule],
})
export class ContactsComponent {

    contact = new ContactsRequest;
    processingRequest = false;

    constructor(
        private alertService: AlertService,
        private contactsService: ContactsService,
        private router: Router
    ) {}

    async onSubmit() {
        this.processingRequest = true;
        await lastValueFrom(this.contactsService.create(this.contact));
        this.alertService.setMessage('Запитването е изпратено успешно.');
        this.processingRequest = false;
        this.router.navigateByUrl('/');
    }
}
