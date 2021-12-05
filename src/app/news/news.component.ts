import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators'
import { LoaderService } from '../service/loader.service';
import { MainService } from '../service/main.service';
import { News } from '../service/service.model';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {
  news$: Observable<News[]> = <Observable<News[]>>{}

  constructor(private mainService: MainService, private loaderService: LoaderService) { }

  ngOnInit(): void {
    //finhub.io doesn't have pagination queryParams for market news

    //datetime returned from finhub is in seconds
    //added this to convert to milliseconds
    this.loaderService.setLoading(true);
    this.news$ = this.mainService.getNews().pipe(
      map(news => {
        return news.map(mapNews => {
          return{
            ...mapNews,
            datetime: mapNews.datetime * 1000
          }
        })
      }),
      tap(news => {
        this.loaderService.setLoading(false)
      })
    );
  }

}
