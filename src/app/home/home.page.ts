import { Component } from '@angular/core';
import { NetworkService } from './../services/network.service';
import { ApiService } from './../services/api.service';
import { AddDogModalComponent } from './../modals/add-dog-modal/add.dog.modal';
import { ModalController } from '@ionic/angular';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  dogs: any;

  constructor(private networkService: NetworkService, private apiService: ApiService, private modalCtrl: ModalController) {
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

  async presentModal() {
    console.log('HomePage::presentModal | method called');
    const componentProps = { modalProps: { title: 'Add Dog Modal', buttonText: 'Add'}};
    const modal = await this.modalCtrl.create({
      component: AddDogModalComponent,
      componentProps: componentProps
    });
    await modal.present();

    const {data} = await modal.onWillDismiss();
    if (data) {
      console.log('data', data);
    }
  }


}
