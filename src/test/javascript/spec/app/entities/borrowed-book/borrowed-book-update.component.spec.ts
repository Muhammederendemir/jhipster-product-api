/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { LibraryTestModule } from '../../../test.module';
import { BorrowedBookUpdateComponent } from 'app/entities/borrowed-book/borrowed-book-update.component';
import { BorrowedBookService } from 'app/entities/borrowed-book/borrowed-book.service';
import { BorrowedBook } from 'app/shared/model/borrowed-book.model';

describe('Component Tests', () => {
    describe('BorrowedBook Management Update Component', () => {
        let comp: BorrowedBookUpdateComponent;
        let fixture: ComponentFixture<BorrowedBookUpdateComponent>;
        let service: BorrowedBookService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [LibraryTestModule],
                declarations: [BorrowedBookUpdateComponent]
            })
                .overrideTemplate(BorrowedBookUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(BorrowedBookUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BorrowedBookService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new BorrowedBook(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.borrowedBook = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );

            it(
                'Should call create service on save for new entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new BorrowedBook();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.borrowedBook = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.create).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );
        });
    });
});
