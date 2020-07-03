import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { MarkdownModule } from 'ngx-markdown';

import { AppComponent } from './app.component';
import { GraphQLModule } from './graphql.module';
import { NavComponent } from './components/nav/nav.component';
import { ArticlesComponent } from './components/articles/articles.component';
import { ArticleComponent } from './components/article/article.component';
import { CategoryComponent } from './components/category/category.component';
import { MeetingsComponent } from './components/meetings/meetings.component';
import { HomeComponent } from './components/home/home.component';
import { LocationComponent } from './components/location/location.component';
import { DataService } from './services/data.service';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'meetings', component: MeetingsComponent },
  { path: 'article/:id', component: ArticleComponent },
  { path: 'category/:id', component: CategoryComponent },
  { path: 'location/:name', component: LocationComponent },
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
    LocationComponent
  ],
  imports: [
    MarkdownModule.forRoot(),
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    GraphQLModule,
    HttpClientModule
  ],
  providers: [
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
