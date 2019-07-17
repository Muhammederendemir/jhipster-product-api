export interface IPublisher {
    id?: number;
    name?: string;
}

export class Publisher implements IPublisher {
    constructor(public id?: number, public name?: string) {}
}
