import { BlogPostDto } from './../../shared/proxies-sevices/proxies.service';
import { Component, OnInit } from '@angular/core';
import { ServiceProxies } from '../../shared/proxies-sevices/proxies.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  id: number = 1;
  blogPost: BlogPostDto = {

  }

  constructor(private _service: ServiceProxies, private toastr: ToastrService) {}
  ngOnInit(): void {
    this.getBlogPost();
  }

  getBlogPost() {
      this._service.getBlogPost(this.id).subscribe(
        (data: BlogPostDto) => {
          this.blogPost = data;
        },
        (error) => {
          this.toastr.error(error);
        }
      );
  }
}
