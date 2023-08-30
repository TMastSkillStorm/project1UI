import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Product } from './product';
import { MessageService } from './message.service';


@Injectable({ providedIn: 'root' })
export class ProductService {

  private productUrl = 'http://localhost:8080/v1/products';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json', 'allow': 'PUT' })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  /** GET Productfrom the server */
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.productUrl)
      .pipe(
        tap(_ => this.log('fetched Products')),
        catchError(this.handleError<Product[]>('getProducts', []))
      );
  }



  /** GET product by id. Will 404 if id not found */
  getProduct(id: number): Observable<Product> {
    const url = `${this.productUrl}/${id}`;
    return this.http.get<Product>(url).pipe(
      tap(_ => this.log(`fetched Product id=${id}`)),
      catchError(this.handleError<Product>(`getProduct id=${id}`))
    );
  }


  //////// Save methods //////////

  /** POST: add a new Product to the server */
  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.productUrl, product, this.httpOptions).pipe(
      tap((newProduct: Product) => this.log(`added Product w/ id=${newProduct.productId}`)),
      catchError(this.handleError<Product>('addProduct'))
    );
  }

  /** DELETE: delete the Product from the server */
  deleteProduct(id: number): Observable<Product> {
    const url = `${this.productUrl}/${id}`;

    return this.http.delete<Product>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted product id=${id}`)),
      catchError(this.handleError<Product>('deleteProduct'))
    );
  }

  /** PUT: update the Product on the server */
  updateProduct(product: Product, id:number): Observable<any> {
    const url = `${this.productUrl}/${id}`;
    return this.http.put(url, product, this.httpOptions).pipe(
      tap(_ => this.log(`updated Product id=${product.productId}`)),
      catchError(this.handleError<any>('updateProduct'))
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

  /** Log a Productervice message with the MessageService */
  private log(message: string) {
    this.messageService.add(`ProductService: ${message}`);
  }
}