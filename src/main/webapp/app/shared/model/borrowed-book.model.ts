import { Moment } from 'moment';
import { IBook } from 'app/shared/model/book.model';
import { IClient } from 'app/shared/model/client.model';

export interface IBorrowedBook {
    id?: number;
    borrowDate?: Moment;
    book?: IBook;
    client?: IClient;
}

export class BorrowedBook implements IBorrowedBook {
    constructor(public id?: number, public borrowDate?: Moment, public book?: IBook, public client?: IClient) {}
}
