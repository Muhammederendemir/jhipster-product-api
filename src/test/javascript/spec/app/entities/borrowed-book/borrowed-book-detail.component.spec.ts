/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { LibraryTestModule } from '../../../test.module';
import { BorrowedBookDetailComponent } from 'app/entities/borrowed-book/borrowed-book-detail.component';
import { BorrowedBook } from 'app/shared/model/borrowed-book.model';

describe('Component Tests', () => {
    describe('BorrowedBook Management Detail Component', () => {
        let comp: BorrowedBookDetailComponent;
        let fixture: ComponentFixture<BorrowedBookDetailComponent>;
        const route = ({ data: of({ borrowedBook: new BorrowedBook(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [LibraryTestModule],
                declarations: [BorrowedBookDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(BorrowedBookDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(BorrowedBookDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.borrowedBook).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
