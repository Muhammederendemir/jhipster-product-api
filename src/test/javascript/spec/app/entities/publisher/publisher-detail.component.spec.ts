/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { LibraryTestModule } from '../../../test.module';
import { PublisherDetailComponent } from 'app/entities/publisher/publisher-detail.component';
import { Publisher } from 'app/shared/model/publisher.model';

describe('Component Tests', () => {
    describe('Publisher Management Detail Component', () => {
        let comp: PublisherDetailComponent;
        let fixture: ComponentFixture<PublisherDetailComponent>;
        const route = ({ data: of({ publisher: new Publisher(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [LibraryTestModule],
                declarations: [PublisherDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(PublisherDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(PublisherDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.publisher).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
