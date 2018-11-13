import { Component } from '@angular/core';
import { NetworkService } from './../services/network.service';
import { ApiService } from './../services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  dogs: any;

  constructor(private networkService: NetworkService, private apiService: ApiService) {
    console.log('HomePage::constructor() | method called');
    this.loadData(true);
  }

  loadData(refresh = false, refresher?) {
    this.apiService.getDogs(refresh).subscribe(res => {
      this.dogs = res;
      if (refresher) {
        refresher.target.complete();
      }
    });
  }

}
