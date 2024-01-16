import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './_guards/auth.guard';
import { BlogpostCreateComponent } from './blogposts/blogpost-create/blogpost-create.component';
import { BlogpostListComponent } from './blogposts/blogpost-list/blogpost-list.component';
import { BlogpostDetailComponent } from './blogposts/blogpost-detail/blogpost-detail.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Home',
  },
  { path: 'register', component: RegisterComponent, title: 'Register' },
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      {
        path: 'create',
        component: BlogpostCreateComponent,
        title: 'Create Blog Post',
      },
      {
        path: 'list',
        component: BlogpostListComponent,
        title: 'List Blog Post',
      },
      {
        path: 'blogpost/:id',
        component: BlogpostDetailComponent,
        title: 'Blog Post Detail',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
