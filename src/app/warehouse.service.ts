import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Warehouse } from './warehouse';
import { MessageService } from './message.service';


@Injectable({ providedIn: 'root' })
export class WarehouseService {

  private warehouseUrl = 'http://localhost:8080/v1/warehouses';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  /** GET heroes from the server */
  getWarehouses(): Observable<Warehouse[]> {
    return this.http.get<Warehouse[]>(this.warehouseUrl)
      .pipe(
        tap(_ => this.log('fetched Warehouses')),
        catchError(this.handleError<Warehouse[]>('getWarehouses', []))
      );
  }

  /** GET hero by id. Return `undefined` when id not found */
  getHeroNo404<Data>(id: number): Observable<Warehouse> {
    const url = `${this.warehouseUrl}/?id=${id}`;
    return this.http.get<Warehouse[]>(url)
      .pipe(
        map(warehouse => warehouse[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? 'fetched' : 'did not find';
          this.log(`${outcome} Warehouse id=${id}`);
        }),
        catchError(this.handleError<Warehouse>(`getWarehouse id=${id}`))
      );
  }

  /** GET hero by id. Will 404 if id not found */
  getWarehouse(id: number): Observable<Warehouse> {
    const url = `${this.warehouseUrl}/${id}`;
    return this.http.get<Warehouse>(url).pipe(
      tap(_ => this.log(`fetched Warehouse id=${id}`)),
      catchError(this.handleError<Warehouse>(`getWarehouse id=${id}`))
    );
  }


  //////// Save methods //////////

  /** POST: add a new Warehouse to the server */
  addWarehouse(warehouse: Warehouse): Observable<Warehouse> {
    return this.http.post<Warehouse>(this.warehouseUrl, warehouse, this.httpOptions).pipe(
      tap((newWarehouse: Warehouse) => this.log(`added Warehouse w/ id=${newWarehouse.id}`)),
      catchError(this.handleError<Warehouse>('addHero'))
    );
  }

  /** DELETE: delete the Warehouse from the server */
  deleteWarehouse(id: number): Observable<Warehouse> {
    const url = `${this.warehouseUrl}/${id}`;

    return this.http.delete<Warehouse>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted hero id=${id}`)),
      catchError(this.handleError<Warehouse>('deleteHero'))
    );
  }

  /** PUT: update the hero on the server */
  updateWarehouse(warehouse: Warehouse): Observable<any> {
    return this.http.put(this.warehouseUrl, warehouse, this.httpOptions).pipe(
      tap(_ => this.log(`updated hero id=${warehouse.id}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`WarehouseService: ${message}`);
  }
}