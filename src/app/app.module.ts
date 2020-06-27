import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { MarkdownModule } from 'ngx-markdown';

import { AppComponent } from './app.component';
import { GraphQLModule } from './graphql.module';
import { NavComponent } from './nav/nav.component';
import { ArticlesComponent } from './articles/articles.component';
import { ArticleComponent } from './article/article.component';
import { CategoryComponent } from './category/category.component';
import { MeetingsComponent } from './meetings/meetings.component';
import { HomeComponent } from './home/home.component';
import { CityComponent } from './city/city.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'meetings', component: MeetingsComponent },
  { path: 'article/:id', component: ArticleComponent },
  { path: 'category/:id', component: CategoryComponent },
  { path: 'city/:id', component: CityComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    ArticlesComponent,
    ArticleComponent,
    CategoryComponent,
    MeetingsComponent,
    HomeComponent,
    CityComponent
  ],
  imports: [
    MarkdownModule.forRoot(),
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    GraphQLModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
