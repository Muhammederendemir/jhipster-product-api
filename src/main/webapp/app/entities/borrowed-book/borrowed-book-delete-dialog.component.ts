import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IBorrowedBook } from 'app/shared/model/borrowed-book.model';
import { BorrowedBookService } from './borrowed-book.service';

@Component({
    selector: 'jhi-borrowed-book-delete-dialog',
    templateUrl: './borrowed-book-delete-dialog.component.html'
})
export class BorrowedBookDeleteDialogComponent {
    borrowedBook: IBorrowedBook;

    constructor(
        protected borrowedBookService: BorrowedBookService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.borrowedBookService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'borrowedBookListModification',
                content: 'Deleted an borrowedBook'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-borrowed-book-delete-popup',
    template: ''
})
export class BorrowedBookDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ borrowedBook }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(BorrowedBookDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.borrowedBook = borrowedBook;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/borrowed-book', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/borrowed-book', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
