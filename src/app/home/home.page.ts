import { Component } from '@angular/core';
import { NetworkService } from './../services/network.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private networkService: NetworkService) {
    console.log('HomePage::constructor() | method called');
  }

}
