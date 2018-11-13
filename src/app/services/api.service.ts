import { NetworkService, ConnectionStatus } from './network.service';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Observable, from, throwError } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

import { OfflineManagerService } from './offline-manager.service';

const API_STORAGE_KEY = 'specialkey';
const API_URL = 'http://localhost:3004';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private networkService: NetworkService, private http: HttpClient, private storage: Storage,
    private offlineManager: OfflineManagerService) { }

  getDogs(forceRefresh: boolean = false): Observable<any[]> {
    if (this.networkService.getCurrentNetworkStatus() === ConnectionStatus.Offline || !forceRefresh) {
      // Return the cached data from Storage
      return from(this.getLocalData('dogs'));
    } else {
      // Return real API data and store it locally
      return this.http.get<any[]>(`${API_URL}/dogs`).pipe(
        tap(res => {
          console.log('res', res);
          this.setLocalData('dogs', res);
        }),
        catchError((x, caught) => {
          return throwError(x);
      }),
      );
    }
  }

  addDog(dog, data): Observable<any> {
    const url = `${API_URL}/dogs/${dog}`;
    if (this.networkService.getCurrentNetworkStatus() === ConnectionStatus.Offline) {
      return from(this.offlineManager.storeRequest(url, 'PUT', data));
    } else {
      return this.http.put(url, data).pipe(
        catchError(err => {
          this.offlineManager.storeRequest(url, 'PUT', data);
          throw new Error(err);
        })
      );
    }
  }

  // Save result of API requests
  private setLocalData(key, data) {
    console.log('ApiService::setLocalData(key, data) | method called', key, data);
    this.storage.ready().then(() => {
      this.storage.set(`${API_STORAGE_KEY}-${key}`, data);
    });
  }

  // Get cached API result
  private getLocalData(key) {
    console.log('ApiService::getLocalData(key) | method called', key);
    return this.storage.get(`${API_STORAGE_KEY}-${key}`);
  }
}
