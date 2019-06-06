import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppSharedService {

  /** Observable string sources for loading indicator */
  private loadingIndicatorSource = new Subject<any>();

  /** Observable string streams for loading indicator */
  loadingIndicator = this.loadingIndicatorSource.asObservable();

  constructor() { }

  /** Loading Indicator shared Service */
  showLoadingIndicator() {
    this.loadingIndicatorSource.next(true);
  }
  hideLoadingIndicator() {
    this.loadingIndicatorSource.next(false);
  }

}
