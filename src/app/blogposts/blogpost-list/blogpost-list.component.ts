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
  blogPosts: BlogPostDto[] = [];
  constructor(private _service: ServiceProxies) {}
  ngOnInit(): void {
    this.getBlogPosts();
  }

  getBlogPosts() {
    this._service.getBlogPosts('new', 1, 5).subscribe(
      (data: BlogPostDto[]) => {
        this.blogPosts = data;
      },
      (error) => {
        console.error('Error fetching blog posts:', error);
      }
    );
  }
}
