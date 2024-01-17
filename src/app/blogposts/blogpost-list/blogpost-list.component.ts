import { Pagination } from './../../_models/pagination';
import { BlogParams } from './../../_models/blogParams';
import { BlogService } from './../../_services/blog.service';
import { Component, OnInit } from '@angular/core';
import {
  BlogPostDto,
  ServiceProxies,
} from '../../../shared/proxies-sevices/proxies.service';

@Component({
  selector: 'app-blogpost-list',
  templateUrl: './blogpost-list.component.html',
  styleUrl: './blogpost-list.component.css',
})
export class BlogpostListComponent implements OnInit {
  blogParams!: BlogParams;
  blogPosts: BlogPostDto[] = [];
  pagination!: Pagination;

  constructor(private blogService: BlogService) {
    this.blogParams = this.blogService.getBlogParams();
  }
  ngOnInit(): void {
    this.blogParams = this.blogService.getBlogParams();
    this.getBlogPosts();
  }

  getBlogPosts() {
    this.blogService.setBlogParams(this.blogParams);
    this.blogService.getBlogPosts(this.blogParams).subscribe((response) => {
      this.blogPosts = response.result;
      this.pagination = response.pagination;
    });
  }

  resetFilters() {
    this.blogParams = this.blogService.resetBlogParams();
    this.getBlogPosts();
  }

  pageChanged(event: any) {
    this.blogParams.pageNumber = event;
    this.blogService.setBlogParams(this.blogParams);
    this.getBlogPosts();
  }
}
