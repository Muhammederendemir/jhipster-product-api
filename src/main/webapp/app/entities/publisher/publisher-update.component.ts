import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { IPublisher } from 'app/shared/model/publisher.model';
import { PublisherService } from './publisher.service';

@Component({
    selector: 'jhi-publisher-update',
    templateUrl: './publisher-update.component.html'
})
export class PublisherUpdateComponent implements OnInit {
    publisher: IPublisher;
    isSaving: boolean;

    constructor(protected publisherService: PublisherService, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ publisher }) => {
            this.publisher = publisher;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.publisher.id !== undefined) {
            this.subscribeToSaveResponse(this.publisherService.update(this.publisher));
        } else {
            this.subscribeToSaveResponse(this.publisherService.create(this.publisher));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IPublisher>>) {
        result.subscribe((res: HttpResponse<IPublisher>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
}
