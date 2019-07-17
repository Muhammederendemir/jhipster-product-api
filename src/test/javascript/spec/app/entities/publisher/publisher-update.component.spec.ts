/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { LibraryTestModule } from '../../../test.module';
import { PublisherUpdateComponent } from 'app/entities/publisher/publisher-update.component';
import { PublisherService } from 'app/entities/publisher/publisher.service';
import { Publisher } from 'app/shared/model/publisher.model';

describe('Component Tests', () => {
    describe('Publisher Management Update Component', () => {
        let comp: PublisherUpdateComponent;
        let fixture: ComponentFixture<PublisherUpdateComponent>;
        let service: PublisherService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [LibraryTestModule],
                declarations: [PublisherUpdateComponent]
            })
                .overrideTemplate(PublisherUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(PublisherUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PublisherService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Publisher(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.publisher = entity;
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
                    const entity = new Publisher();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.publisher = entity;
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
