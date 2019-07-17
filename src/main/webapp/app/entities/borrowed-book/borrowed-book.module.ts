import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { LibrarySharedModule } from 'app/shared';
import {
    BorrowedBookComponent,
    BorrowedBookDetailComponent,
    BorrowedBookUpdateComponent,
    BorrowedBookDeletePopupComponent,
    BorrowedBookDeleteDialogComponent,
    borrowedBookRoute,
    borrowedBookPopupRoute
} from './';

const ENTITY_STATES = [...borrowedBookRoute, ...borrowedBookPopupRoute];

@NgModule({
    imports: [LibrarySharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        BorrowedBookComponent,
        BorrowedBookDetailComponent,
        BorrowedBookUpdateComponent,
        BorrowedBookDeleteDialogComponent,
        BorrowedBookDeletePopupComponent
    ],
    entryComponents: [
        BorrowedBookComponent,
        BorrowedBookUpdateComponent,
        BorrowedBookDeleteDialogComponent,
        BorrowedBookDeletePopupComponent
    ],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LibraryBorrowedBookModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
