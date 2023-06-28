import { ChangeDetectorRef, Component } from '@angular/core';
import { AppService } from './service/app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  showLoader: boolean = false;

  constructor(
    private _app: AppService,
    public cdRef: ChangeDetectorRef,
  ){}

  ngOnInit(){
    this._app.loaderInfo.subscribe((val) => {
      this.showLoader = val;
      this.cdRef.detectChanges();
    });
  }
}
