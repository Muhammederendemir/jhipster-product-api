import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IPublisher } from 'app/shared/model/publisher.model';

type EntityResponseType = HttpResponse<IPublisher>;
type EntityArrayResponseType = HttpResponse<IPublisher[]>;

@Injectable({ providedIn: 'root' })
export class PublisherService {
    public resourceUrl = SERVER_API_URL + 'api/publishers';

    constructor(protected http: HttpClient) {}

    create(publisher: IPublisher): Observable<EntityResponseType> {
        return this.http.post<IPublisher>(this.resourceUrl, publisher, { observe: 'response' });
    }

    update(publisher: IPublisher): Observable<EntityResponseType> {
        return this.http.put<IPublisher>(this.resourceUrl, publisher, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IPublisher>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IPublisher[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
