import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { EChartsOption } from 'echarts';
import { Observable } from 'rxjs';
import { map, tap, share } from 'rxjs/operators';
import getMinMax from '../helpers/getMinMax';
import { LoaderService } from '../service/loader.service';
import { MainService } from '../service/main.service';
import { Quote } from '../service/service.model';
import { OwlOptions } from 'ngx-owl-carousel-o';


@Component({
  selector: 'app-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class StocksComponent implements OnInit {
  isLoading$: Observable<boolean> = <Observable<boolean>>{};
  canvasLoading: boolean = false;
  //Filter Values according to Finnhub
  filterValues: string[] = ['1', '5', '15', '30', '60', 'D', 'W', 'M'];
  selectedFilter: string = '1';
  panelOpenState: boolean = false;
  quoteData$: Observable<Quote> = <Observable<Quote>>{};
  dateList: string[] = [];
  valueList: number[] = [];
  chartOption: EChartsOption | any = {};
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 3
      },
      400: {
        items: 3
      },
      740: {
        items: 4
      },
      940: {
        items: 4
      }
    },
    nav: false
  }
  constructor(
    private mainService: MainService,
    private datePipe: DatePipe,
    private loaderService: LoaderService
  ) {}

  ngOnInit(): void {
    this.loaderService.setLoading(true);
    this.isLoading$ = this.loaderService.getLoadingListener();
    this.quoteData$ = this.mainService.getQuotes().pipe(
      share(),
      map((quoteData) => {
        return {
          ...quoteData,
          t: quoteData.t * 1000,
        };
      })
    );
    this.getStockCandles();
  }

  getStockCandles() {
    this.mainService
      .getCandles(this.selectedFilter)
      .pipe(
        share(),
        map((candleData) => {
          return {
            c: candleData.c,
            t: candleData.t.map((candleTime) =>
              this.datePipe.transform(candleTime * 1000, 'medium')
            ),
          };
        })
      )
      .subscribe((res) => {
        this.dateList = res.t as string[];
        this.valueList = res.c as number[];
        this.chartOption = {
          visualMap: {
            show: false,
            type: 'continuous',
            seriesIndex: 0,
            min: 0,
            max: 400,
          },
          title: {
            left: 'center',
            text: '',
          },
          tooltip: {
            trigger: 'axis',
          },
          dataZoom: {
            type: 'inside',
            show: true,
            xAxisIndex: [0, this.dateList.length],
            start: 0,
            end: 100,
          },
          xAxis: {
            data: this.dateList,
          },
          yAxis: {
            min: getMinMax(this.valueList, this.valueList.length).min,
            max: getMinMax(this.valueList, this.valueList.length).max
          },
          grid: {},
          series: {
            type: 'line',
            showSymbol: false,
            data: this.valueList,
          },
        };
        this.loaderService.setLoading(false);
        this.canvasLoading = false;
      });
  }

  onSelectFilter(value: string) {
    this.selectedFilter = value;
    this.canvasLoading = true;
    // this.loaderService.setLoading(true);
    this.getStockCandles();
  }

  checkPositive(value: number | undefined) {
    if ((value as number) > 0) {
      return true;
    }
    return false;
  }
}
