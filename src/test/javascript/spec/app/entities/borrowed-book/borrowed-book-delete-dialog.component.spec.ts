/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { LibraryTestModule } from '../../../test.module';
import { BorrowedBookDeleteDialogComponent } from 'app/entities/borrowed-book/borrowed-book-delete-dialog.component';
import { BorrowedBookService } from 'app/entities/borrowed-book/borrowed-book.service';

describe('Component Tests', () => {
    describe('BorrowedBook Management Delete Component', () => {
        let comp: BorrowedBookDeleteDialogComponent;
        let fixture: ComponentFixture<BorrowedBookDeleteDialogComponent>;
        let service: BorrowedBookService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [LibraryTestModule],
                declarations: [BorrowedBookDeleteDialogComponent]
            })
                .overrideTemplate(BorrowedBookDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(BorrowedBookDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BorrowedBookService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete', inject(
                [],
                fakeAsync(() => {
                    // GIVEN
                    spyOn(service, 'delete').and.returnValue(of({}));

                    // WHEN
                    comp.confirmDelete(123);
                    tick();

                    // THEN
                    expect(service.delete).toHaveBeenCalledWith(123);
                    expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                })
            ));
        });
    });
});
