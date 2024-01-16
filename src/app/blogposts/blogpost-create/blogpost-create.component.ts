import { ToastrService } from 'ngx-toastr';
import {
  CreateBlogPostDto,
  ServiceProxies,
} from '../../../shared/proxies-sevices/proxies.service';
import { AccountService } from './../../_services/account.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-blogpost-create',
  templateUrl: './blogpost-create.component.html',
  styleUrl: './blogpost-create.component.css',
})
export class BlogpostCreateComponent {
  constructor(
    public accountService: AccountService,
    private _service: ServiceProxies,
    private toastr: ToastrService,
    private router: Router
  ) {}
  blogPost: CreateBlogPostDto = {
    userID: this.accountService.getCurrentUserId(),
    title: '',
    content: '',
  };

  quillConfig = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'], // toggled buttons
      ['blockquote', 'code-block'],

      [{ header: 1 }, { header: 2 }], // custom button values
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
      [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
      [{ direction: 'rtl' }], // text direction

      [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
      [{ header: [1, 2, 3, 4, 5, 6, false] }],

      [{ color: [] }, { background: [] }], // dropdown with defaults from theme
      [{ font: [] }],
      [{ align: [] }],

      ['clean'], // remove formatting button

      ['link', 'image', 'video'], // link and image, video
    ],
  };

  createBlogPost() {
    this._service.createBlogPost(this.blogPost).subscribe(
      (response) => {
        this.toastr.success('Create Successful');
        this.router.navigateByUrl('');
      },
      (error) => {
        this.toastr.error('Create Failed');
      }
    );
  }
}
