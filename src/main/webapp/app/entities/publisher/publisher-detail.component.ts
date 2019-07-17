import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPublisher } from 'app/shared/model/publisher.model';

@Component({
    selector: 'jhi-publisher-detail',
    templateUrl: './publisher-detail.component.html'
})
export class PublisherDetailComponent implements OnInit {
    publisher: IPublisher;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ publisher }) => {
            this.publisher = publisher;
        });
    }

    previousState() {
        window.history.back();
    }
}
