import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  BlogPost,
  ServiceProxies,
} from '../../../shared/proxies-sevices/proxies.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-blogpost-detail',
  templateUrl: './blogpost-detail.component.html',
  styleUrl: './blogpost-detail.component.css',
})
export class BlogpostDetailComponent implements OnInit {
  blogPost: BlogPost | null = null;
  constructor(
    private _service: ServiceProxies,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const postId = +params['id'];
      if (!isNaN(postId)) {
        this.getBlogPost(postId);
      }
    });
  }

  getBlogPost(postId: number): void {
    this._service.getBlogPost(postId).subscribe(
      (data: BlogPost) => {
        this.blogPost = data;
      },
      (error) => {
        console.error('Error fetching blog post:', error);
      }
    );
  }
}
