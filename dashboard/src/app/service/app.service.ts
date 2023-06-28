import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor() { }

  public showLoader = new BehaviorSubject<boolean>(false);
  loaderInfo = this.showLoader.asObservable();

  changeLoaderVisibility(shouldShow: boolean) {
    this.showLoader.next(shouldShow);
  }

  
}
