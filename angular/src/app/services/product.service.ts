import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, finalize } from 'rxjs';
import { ListProduct } from '../models/product.model';
const baseUrl = 'https://dummyjson.com';
@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private isLoadingSubject = new BehaviorSubject<boolean>(false);
  isLoading$ = this.isLoadingSubject.asObservable();
  constructor(private http: HttpClient) {}

  getAll(page: number): Observable<ListProduct> {
    const url = `${baseUrl}/products?limit=10&skip=${page * 10}`;
    return this.http
      .get<ListProduct>(url)
      .pipe(finalize(() =>{

      }));
  }
}
