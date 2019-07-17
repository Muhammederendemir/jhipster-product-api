import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'publisher',
                loadChildren: './publisher/publisher.module#LibraryPublisherModule'
            },
            {
                path: 'author',
                loadChildren: './author/author.module#LibraryAuthorModule'
            },
            {
                path: 'client',
                loadChildren: './client/client.module#LibraryClientModule'
            },
            {
                path: 'book',
                loadChildren: './book/book.module#LibraryBookModule'
            },
            {
                path: 'borrowed-book',
                loadChildren: './borrowed-book/borrowed-book.module#LibraryBorrowedBookModule'
            }
            /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
        ])
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LibraryEntityModule {}
