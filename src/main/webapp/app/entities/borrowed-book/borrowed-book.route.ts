import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { BorrowedBook } from 'app/shared/model/borrowed-book.model';
import { BorrowedBookService } from './borrowed-book.service';
import { BorrowedBookComponent } from './borrowed-book.component';
import { BorrowedBookDetailComponent } from './borrowed-book-detail.component';
import { BorrowedBookUpdateComponent } from './borrowed-book-update.component';
import { BorrowedBookDeletePopupComponent } from './borrowed-book-delete-dialog.component';
import { IBorrowedBook } from 'app/shared/model/borrowed-book.model';

@Injectable({ providedIn: 'root' })
export class BorrowedBookResolve implements Resolve<IBorrowedBook> {
    constructor(private service: BorrowedBookService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IBorrowedBook> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<BorrowedBook>) => response.ok),
                map((borrowedBook: HttpResponse<BorrowedBook>) => borrowedBook.body)
            );
        }
        return of(new BorrowedBook());
    }
}

export const borrowedBookRoute: Routes = [
    {
        path: '',
        component: BorrowedBookComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'libraryApp.borrowedBook.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: BorrowedBookDetailComponent,
        resolve: {
            borrowedBook: BorrowedBookResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'libraryApp.borrowedBook.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: BorrowedBookUpdateComponent,
        resolve: {
            borrowedBook: BorrowedBookResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'libraryApp.borrowedBook.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: BorrowedBookUpdateComponent,
        resolve: {
            borrowedBook: BorrowedBookResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'libraryApp.borrowedBook.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const borrowedBookPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: BorrowedBookDeletePopupComponent,
        resolve: {
            borrowedBook: BorrowedBookResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'libraryApp.borrowedBook.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
