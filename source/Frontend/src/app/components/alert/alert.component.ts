import { CommonModule }                 from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable }                   from 'rxjs';
import { AlertService }                 from '../../services/alert.service';

@Component({
    selector: 'app-alert',
    standalone: true,
    templateUrl: './alert.component.html',
    styleUrl: './alert.component.css',
    imports: [CommonModule]
})
export class AlertComponent implements OnInit {

    messages$ = new Observable<string[]>;
    
    constructor(private alertService: AlertService) {}

    ngOnInit(): void {
        this.messages$ = this.alertService.getMessages();
    }
}
