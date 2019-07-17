export interface IClient {
    id?: number;
    firstName?: string;
    lastName?: string;
    email?: string;
    address?: string;
    phone?: string;
}

export class Client implements IClient {
    constructor(
        public id?: number,
        public firstName?: string,
        public lastName?: string,
        public email?: string,
        public address?: string,
        public phone?: string
    ) {}
}
