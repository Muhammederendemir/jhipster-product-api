import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IBorrowedBook } from 'app/shared/model/borrowed-book.model';

@Component({
    selector: 'jhi-borrowed-book-detail',
    templateUrl: './borrowed-book-detail.component.html'
})
export class BorrowedBookDetailComponent implements OnInit {
    borrowedBook: IBorrowedBook;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ borrowedBook }) => {
            this.borrowedBook = borrowedBook;
        });
    }

    previousState() {
        window.history.back();
    }
}
