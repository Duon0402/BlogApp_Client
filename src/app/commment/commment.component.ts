import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {
  CommentDto,
  CreateCommentDto,
  ServiceProxies,
} from '../../shared/proxies-sevices/proxies.service';
import { AccountService } from './../_services/account.service';

@Component({
  selector: 'app-commment',
  templateUrl: './commment.component.html',
  styleUrl: './commment.component.css',
})
export class CommmentComponent implements OnInit {
  commentDto: CreateCommentDto = {
    userId: this.accountService.getCurrentUserId(),
    content: '',
    blogPostId: 0,
  };

  orderBy: string = 'new';

  comments: CommentDto[] = [];

  constructor(
    private _service: ServiceProxies,
    private accountService: AccountService,
    private toastr: ToastrService,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.getListComment();
  }

  comment() {
    this.route.params.subscribe((params) => {
      const postId = +params['id'];
      if (!isNaN(postId)) {
        this.commentDto.blogPostId = postId;

        this._service.createComment(this.commentDto).subscribe(
          (response) => {
            this.commentDto.content = '';
            this.getListComment();
          },
          (error) => {
            this.toastr.error('Comment Failed');
          }
        );
      }
    });
  }

  getListComment() {
    this.route.params.subscribe((params) => {
      const postId = +params['id'];
      if (!isNaN(postId)) {
        this.commentDto.blogPostId = postId;
        this._service
          .getCommentsByBlogPostId(this.commentDto.blogPostId, this.orderBy)
          .subscribe((data: CommentDto[]) => {
            this.comments = data;
          });
      }
    });
  }
}
