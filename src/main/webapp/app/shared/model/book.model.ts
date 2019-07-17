import { IPublisher } from 'app/shared/model/publisher.model';
import { IAuthor } from 'app/shared/model/author.model';

export interface IBook {
    id?: number;
    isbn?: string;
    name?: string;
    publishYear?: string;
    copies?: number;
    coverContentType?: string;
    cover?: any;
    publisher?: IPublisher;
    authors?: IAuthor[];
}

export class Book implements IBook {
    constructor(
        public id?: number,
        public isbn?: string,
        public name?: string,
        public publishYear?: string,
        public copies?: number,
        public coverContentType?: string,
        public cover?: any,
        public publisher?: IPublisher,
        public authors?: IAuthor[]
    ) {}
}
