import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs';
import { AppService } from 'src/app/service/app.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  directionLinks: boolean = true;
  maxSize: number = 9;

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private _app: AppService,
    private ngZone: NgZone
  ) { }

  bodyTemperature = {
    page: {
      itemsPerPage: 5,
      currentPage: 1,
      totalItems: 0
    },
    list: []
  };
  bodyMovement = {
    page: {
      itemsPerPage: 5,
      currentPage: 1,
      totalItems: 0
    },
    list: []
  };
  humidity = {
    page: {
      itemsPerPage: 5,
      currentPage: 1,
      totalItems: 0
    },
    list: []
  };
  temperature = {
    page: {
      itemsPerPage: 5,
      currentPage: 1,
      totalItems: 0
    },
    list: []
  };
  pulse = {
    page: {
      itemsPerPage: 5,
      currentPage: 1,
      totalItems: 0
    },
    list: []
  };

  ngOnInit(): void {
    const access_token = this._app.getCookiesByName('token');
    if (access_token) {
      this.getUserDetails();
      this.filterData(1, true, false, false, false, false);
      this.filterData(1, false, true, false, false, false);
      this.filterData(1, false, false, true, false, false);
      this.filterData(1, false, false, false, true, false);
      this.filterData(1, false, false, false, false, true);
    }
    else {
      this.router.navigateByUrl('login');
    }
  }

  getUserDetails() {

  }

  filterData(page: any, bodyTemperature: boolean, bodyMovement: boolean, humidity: boolean, temperature: boolean, pulse: boolean) {
    const payload = {
      "page": page - 1,
      "size": 5,
      "order": "DESC",
      "orderBy": "createdDate",
      "bodyTemperature": bodyTemperature,
      "bodyMovement": bodyMovement,
      "humidity": humidity,
      "temperature": temperature,
      "pulse": pulse
    }
    this._app.changeLoaderVisibility(true);
    this._app.getFilterData(payload).pipe(finalize(() => this._app.changeLoaderVisibility(false))).subscribe((res) => {
      if (bodyTemperature) {
        this.bodyTemperature['list'] = res?.content || [];
        this.bodyTemperature['page']['totalItems'] = res?.totalElements || 0;
      }
      else if (bodyMovement) {
        this.bodyMovement['list'] = res?.content || [];
        this.bodyMovement['page']['totalItems'] = res?.totalElements || 0;
      }
      else if (humidity) {
        this.humidity['list'] = res?.content || [];
        this.humidity['page']['totalItems'] = res?.totalElements || 0;
      }
      else if (temperature) {
        this.temperature['list'] = res?.content || [];
        this.temperature['page']['totalItems'] = res?.totalElements || 0;
      }
      else if (pulse) {
        this.pulse['list'] = res?.content || [];
        this.pulse['page']['totalItems'] = res?.totalElements || 0;
      }
    })
  }

  pageChange(page, type){
    this.ngZone.run(() => {
      this[type].page['currentPage'] = page;
      const obj = {
        bodyTemperature: type == 'bodyTemperature' ? true : false,
        bodyMovement: type == 'bodyMovement' ? true : false,
        humidity: type == 'humidity' ? true : false,
        temperature: type == 'temperature' ? true : false,
        pulse: type == 'pulse' ? true : false,
      }
      this.filterData(this[type].page['currentPage'], obj['bodyTemperature'], obj['bodyMovement'], obj['humidity'], obj['temperature'], obj['pulse']);
    });
  }

}
