import { Component, OnInit } from '@angular/core';
import { LoaderService } from 'src/app/service/loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {
  isLoading: boolean = false;
  constructor(
    private loaderService: LoaderService
  ) { }

  ngOnInit(): void {
    this.loaderService.getLoadingListener().subscribe(value => {
      this.isLoading = value
    })
  }

  onCancelLoader(): void {
    this.isLoading = false;
    this.loaderService.setLoading(false)
  }

}
