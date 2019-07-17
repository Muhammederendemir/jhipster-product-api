import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { JhiAlertService } from 'ng-jhipster';
import { IBorrowedBook } from 'app/shared/model/borrowed-book.model';
import { BorrowedBookService } from './borrowed-book.service';
import { IBook } from 'app/shared/model/book.model';
import { BookService } from 'app/entities/book';
import { IClient } from 'app/shared/model/client.model';
import { ClientService } from 'app/entities/client';

@Component({
    selector: 'jhi-borrowed-book-update',
    templateUrl: './borrowed-book-update.component.html'
})
export class BorrowedBookUpdateComponent implements OnInit {
    borrowedBook: IBorrowedBook;
    isSaving: boolean;

    books: IBook[];

    clients: IClient[];
    borrowDateDp: any;

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected borrowedBookService: BorrowedBookService,
        protected bookService: BookService,
        protected clientService: ClientService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ borrowedBook }) => {
            this.borrowedBook = borrowedBook;
        });
        this.bookService
            .query({ 'borrowedBookId.specified': 'false' })
            .pipe(
                filter((mayBeOk: HttpResponse<IBook[]>) => mayBeOk.ok),
                map((response: HttpResponse<IBook[]>) => response.body)
            )
            .subscribe(
                (res: IBook[]) => {
                    if (!this.borrowedBook.book || !this.borrowedBook.book.id) {
                        this.books = res;
                    } else {
                        this.bookService
                            .find(this.borrowedBook.book.id)
                            .pipe(
                                filter((subResMayBeOk: HttpResponse<IBook>) => subResMayBeOk.ok),
                                map((subResponse: HttpResponse<IBook>) => subResponse.body)
                            )
                            .subscribe(
                                (subRes: IBook) => (this.books = [subRes].concat(res)),
                                (subRes: HttpErrorResponse) => this.onError(subRes.message)
                            );
                    }
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
        this.clientService
            .query({ 'borrowedBookId.specified': 'false' })
            .pipe(
                filter((mayBeOk: HttpResponse<IClient[]>) => mayBeOk.ok),
                map((response: HttpResponse<IClient[]>) => response.body)
            )
            .subscribe(
                (res: IClient[]) => {
                    if (!this.borrowedBook.client || !this.borrowedBook.client.id) {
                        this.clients = res;
                    } else {
                        this.clientService
                            .find(this.borrowedBook.client.id)
                            .pipe(
                                filter((subResMayBeOk: HttpResponse<IClient>) => subResMayBeOk.ok),
                                map((subResponse: HttpResponse<IClient>) => subResponse.body)
                            )
                            .subscribe(
                                (subRes: IClient) => (this.clients = [subRes].concat(res)),
                                (subRes: HttpErrorResponse) => this.onError(subRes.message)
                            );
                    }
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.borrowedBook.id !== undefined) {
            this.subscribeToSaveResponse(this.borrowedBookService.update(this.borrowedBook));
        } else {
            this.subscribeToSaveResponse(this.borrowedBookService.create(this.borrowedBook));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IBorrowedBook>>) {
        result.subscribe((res: HttpResponse<IBorrowedBook>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackBookById(index: number, item: IBook) {
        return item.id;
    }

    trackClientById(index: number, item: IClient) {
        return item.id;
    }
}
