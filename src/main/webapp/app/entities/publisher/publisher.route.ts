import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Publisher } from 'app/shared/model/publisher.model';
import { PublisherService } from './publisher.service';
import { PublisherComponent } from './publisher.component';
import { PublisherDetailComponent } from './publisher-detail.component';
import { PublisherUpdateComponent } from './publisher-update.component';
import { PublisherDeletePopupComponent } from './publisher-delete-dialog.component';
import { IPublisher } from 'app/shared/model/publisher.model';

@Injectable({ providedIn: 'root' })
export class PublisherResolve implements Resolve<IPublisher> {
    constructor(private service: PublisherService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IPublisher> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Publisher>) => response.ok),
                map((publisher: HttpResponse<Publisher>) => publisher.body)
            );
        }
        return of(new Publisher());
    }
}

export const publisherRoute: Routes = [
    {
        path: '',
        component: PublisherComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'libraryApp.publisher.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: PublisherDetailComponent,
        resolve: {
            publisher: PublisherResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'libraryApp.publisher.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: PublisherUpdateComponent,
        resolve: {
            publisher: PublisherResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'libraryApp.publisher.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: PublisherUpdateComponent,
        resolve: {
            publisher: PublisherResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'libraryApp.publisher.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const publisherPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: PublisherDeletePopupComponent,
        resolve: {
            publisher: PublisherResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'libraryApp.publisher.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
