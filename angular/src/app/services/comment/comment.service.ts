import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, finalize } from 'rxjs';
import { ListComment } from '../../models/comment.model';
import { Post } from '../../models/post.model';
const baseUrl = 'https://dummyjson.com';
@Injectable({
  providedIn: 'root',
})
export class CommentService {
  constructor(private http: HttpClient) {}
  getAll({
    post,
    page,
  }: {
    post: Post;
    page: number;
  }): Observable<ListComment> {
    const url = `${baseUrl}/comments/post/${post.id}?limit=10&skip=${(page-1) * 10}`;
    return this.http.get<ListComment>(url).pipe(finalize(() => {}));
  }
}
