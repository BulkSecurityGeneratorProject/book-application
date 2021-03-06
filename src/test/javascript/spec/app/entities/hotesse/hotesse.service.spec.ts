/* tslint:disable max-line-length */
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { take, map } from 'rxjs/operators';
import { HotesseService } from 'app/entities/hotesse/hotesse.service';
import { IHotesse, Hotesse, Experience, TypeHotesse, Disponibilite } from 'app/shared/model/hotesse.model';

describe('Service Tests', () => {
    describe('Hotesse Service', () => {
        let injector: TestBed;
        let service: HotesseService;
        let httpMock: HttpTestingController;
        let elemDefault: IHotesse;
        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HttpClientTestingModule]
            });
            injector = getTestBed();
            service = injector.get(HotesseService);
            httpMock = injector.get(HttpTestingController);

            elemDefault = new Hotesse(0, 0, 0, Experience.DEBUTANT, TypeHotesse.HOTESSE, false, Disponibilite.JOUR);
        });

        describe('Service methods', async () => {
            it('should find an element', async () => {
                const returnedFromService = Object.assign({}, elemDefault);
                service
                    .find(123)
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: elemDefault }));

                const req = httpMock.expectOne({ method: 'GET' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should create a Hotesse', async () => {
                const returnedFromService = Object.assign(
                    {
                        id: 0
                    },
                    elemDefault
                );
                const expected = Object.assign({}, returnedFromService);
                service
                    .create(new Hotesse(null))
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'POST' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should update a Hotesse', async () => {
                const returnedFromService = Object.assign(
                    {
                        taille: 1,
                        poids: 1,
                        experience: 'BBBBBB',
                        type: 'BBBBBB',
                        deplacement: true,
                        disponibilite: 'BBBBBB'
                    },
                    elemDefault
                );

                const expected = Object.assign({}, returnedFromService);
                service
                    .update(expected)
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'PUT' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should return a list of Hotesse', async () => {
                const returnedFromService = Object.assign(
                    {
                        taille: 1,
                        poids: 1,
                        experience: 'BBBBBB',
                        type: 'BBBBBB',
                        deplacement: true,
                        disponibilite: 'BBBBBB'
                    },
                    elemDefault
                );
                const expected = Object.assign({}, returnedFromService);
                service
                    .query(expected)
                    .pipe(
                        take(1),
                        map(resp => resp.body)
                    )
                    .subscribe(body => expect(body).toContainEqual(expected));
                const req = httpMock.expectOne({ method: 'GET' });
                req.flush(JSON.stringify([returnedFromService]));
                httpMock.verify();
            });

            it('should delete a Hotesse', async () => {
                const rxPromise = service.delete(123).subscribe(resp => expect(resp.ok));

                const req = httpMock.expectOne({ method: 'DELETE' });
                req.flush({ status: 200 });
            });
        });

        afterEach(() => {
            httpMock.verify();
        });
    });
});
