import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CookieService } from "ngx-cookie";

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private _cookieService: CookieService, private http: HttpClient, @Inject('API_URL') public API_URL: any) { }

  public showLoader = new BehaviorSubject<boolean>(false);
  loaderInfo = this.showLoader.asObservable();

  changeLoaderVisibility(shouldShow: boolean) {
    this.showLoader.next(shouldShow);
  }

  // Token Cookies

  setCookieByName(name: string, res: any) {
    this._cookieService.put(name, res);
  }

  getCookiesByName(slug: any) {
    return this._cookieService.get(slug);
  }

  removeAllCookie() {
    this._cookieService.removeAll();
  }

  doLoggedIn(payload: Object){
    return this.http.post<any>(`${this.API_URL}/v1/auth/login`, payload);
  }

  getUserDetails(){
    return this.http.get<any>(`${this.API_URL}/v1/user`);
  }

  createUser(payload: Object){
    return this.http.post<any>(`${this.API_URL}/v1/user/register`, payload);
  }

  getFilterData(payload: Object){
    return this.http.post<any>(`${this.API_URL}/v1/user-data/filter`, payload);
  }
  
}
