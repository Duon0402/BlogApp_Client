import { BlogParams } from './../_models/blogParams';
import { Injectable } from '@angular/core';
import { BlogPostDto } from '../../shared/proxies-sevices/proxies.service';
import { map, of } from 'rxjs';
import { getPaginatedResult, getPaginationHeaders } from './paginationHelper';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  baseUrl = environment.apiUrl;
  blogPosts: BlogPostDto[] = [];
  blogCache = new Map();
  blogParams!: BlogParams;

  constructor(private http: HttpClient) {
    this.blogParams = new BlogParams();
  }

  getBlogParams() {
    return this.blogParams;
  }

  setBlogParams(params: BlogParams) {
    this.blogParams = params;
  }

  resetBlogParams() {
    this.blogParams = new BlogParams();
    return this.blogParams;
  }

  getBlogPosts(blogParams: BlogParams) {
    var response = this.blogCache.get(Object.values(blogParams).join('-'));
    if (response) {
      return of(response);
    }

    let params = getPaginationHeaders(
      blogParams.pageNumber,
      blogParams.pageSize
    );

    params = params.append('orderBy', blogParams.orderBy);

    return getPaginatedResult<BlogPostDto>(
      this.baseUrl + 'BlogPost/GetBlogPosts',
      params,
      this.http
    ).pipe(
      map((response) => {
        this.blogCache.set(Object.values(blogParams).join('-'), response);
        return response;
      })
    );
  }
}
