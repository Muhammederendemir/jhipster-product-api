/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { LibraryTestModule } from '../../../test.module';
import { AuthorDeleteDialogComponent } from 'app/entities/author/author-delete-dialog.component';
import { AuthorService } from 'app/entities/author/author.service';

describe('Component Tests', () => {
    describe('Author Management Delete Component', () => {
        let comp: AuthorDeleteDialogComponent;
        let fixture: ComponentFixture<AuthorDeleteDialogComponent>;
        let service: AuthorService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [LibraryTestModule],
                declarations: [AuthorDeleteDialogComponent]
            })
                .overrideTemplate(AuthorDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(AuthorDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AuthorService);
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
