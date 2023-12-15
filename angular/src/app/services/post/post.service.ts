import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, finalize } from 'rxjs';
import { ListPost } from '../../models/post.model';
const baseUrl = 'https://dummyjson.com';
@Injectable({
  providedIn: 'root'
})
export class PostService {
  constructor(private http: HttpClient) {}

  getAll(page: number): Observable<ListPost> {
    const url = `${baseUrl}/posts?limit=10&skip=${page * 10}`;
    return this.http
      .get<ListPost>(url)
      .pipe(finalize(() =>{

      }));
  }
}
