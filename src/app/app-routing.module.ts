import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NewsComponent } from './news/news.component';
import { StocksComponent } from './stocks/stocks.component';

const routes: Routes = [
  {path: 'news', component: NewsComponent},
  {path: 'home', component: HomeComponent},
  {path: 'stock', component: StocksComponent},
  {path: '**', redirectTo: 'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
