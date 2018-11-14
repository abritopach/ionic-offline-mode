import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { from, of, forkJoin } from 'rxjs';
import { switchMap, finalize } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

import { ToastController } from '@ionic/angular';

import { StoredRequest } from './../models/stored.request.model';

const STORAGE_REQ_KEY = 'storedreq';

@Injectable({
  providedIn: 'root'
})
export class OfflineManagerService {

  constructor(private storage: Storage, private toastCtrl: ToastController, private http: HttpClient) { }

  checkForEvents() {
    return from(this.storage.get(STORAGE_REQ_KEY)).pipe(
      switchMap(storedOperations => {
        const storedObj = JSON.parse(storedOperations);
        if (storedObj && storedObj.length > 0) {
          return this.sendRequests(storedObj).pipe(
            finalize(() => {
              this.presentToast(`Local data succesfully synced to API!`);
              this.storage.remove(STORAGE_REQ_KEY);
            })
          );
        } else {
          console.log('no local events to sync');
          return of(false);
        }
      })
    );
  }

  sendRequests(operations: StoredRequest[]) {
    const obs = [];

    for (const op of operations) {
      console.log('Make one request: ', op);
      const data = JSON.stringify(op.data);
      console.log('JSON.stringify(op.data)', data);
      const oneObs = this.http.request(op.type, op.url, {body: op.data});
      obs.push(oneObs);
    }

    // Send out all local events and return once they are finished.
    return forkJoin(obs);
  }

  async presentToast(message) {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }

  storeRequest(url, type, data) {
    this.presentToast(`Your data is stored locally because you seem to be offline.`);

    const action: StoredRequest = {
      url: url,
      type: type,
      data: data,
      time: new Date().getTime(),
      id: Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5)
    };
    // https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript

    return this.storage.get(STORAGE_REQ_KEY).then(storedOperations => {
      let storedObj = JSON.parse(storedOperations);

      if (storedObj) {
        storedObj.push(action);
      } else {
        storedObj = [action];
      }
      // Save old & new local transactions back to Storage
      return this.storage.set(STORAGE_REQ_KEY, JSON.stringify(storedObj));
    });
  }
}
