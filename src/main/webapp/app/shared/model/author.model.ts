import { IBook } from 'app/shared/model/book.model';

export interface IAuthor {
    id?: number;
    firstName?: string;
    lastName?: string;
    books?: IBook[];
}

export class Author implements IAuthor {
    constructor(public id?: number, public firstName?: string, public lastName?: string, public books?: IBook[]) {}
}
