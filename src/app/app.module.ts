import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { ServiceProxies } from '../shared/proxies-sevices/proxies.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavComponent } from './nav/nav.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AuthGuard } from './_guards/auth.guard';
import { JwtInterceptor } from './_interceptors/jwt.interceptor';
import { BlogpostCreateComponent } from './blogposts/blogpost-create/blogpost-create.component';
import { BlogpostListComponent } from './blogposts/blogpost-list/blogpost-list.component';
import { QuillModule } from 'ngx-quill';
import { BlogpostDetailComponent } from './blogposts/blogpost-detail/blogpost-detail.component';
@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    HomeComponent,
    NavComponent,
    BlogpostCreateComponent,
    BlogpostListComponent,
    BlogpostDetailComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
    }),
    QuillModule
  ],
  providers: [
    ServiceProxies,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
