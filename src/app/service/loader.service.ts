import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  constructor() { }

  getLoadingListener():Observable<boolean> {
    return this.isLoading.asObservable()
  }

  setLoading(value: boolean): void {
    this.isLoading.next(value)
  }
}
