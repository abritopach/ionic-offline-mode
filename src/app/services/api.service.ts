import { NetworkService, ConnectionStatus } from './network.service';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Observable, from, throwError } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';


const API_STORAGE_KEY = 'specialkey';
const API_URL = 'http://localhost:3004';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private networkService: NetworkService, private http: HttpClient, private storage: Storage) { }

  getDogs(forceRefresh: boolean = false): Observable<any[]> {
    if (this.networkService.getCurrentNetworkStatus() === ConnectionStatus.Offline || !forceRefresh) {
      // Return the cached data from Storage
      return from(this.getLocalData('dogs'));
    } else {
      // Return real API data and store it locally
      return this.http.get<any[]>(`${API_URL}/dogs`).pipe(
        tap(res => {
          console.log('res', res);
          // this.setLocalData('dogs', res);
        }),
        catchError((x, caught) => {
          return throwError(x);
      }),
      );
    }
  }

  // Save result of API requests
  private setLocalData(key, data) {
    this.storage.set(`${API_STORAGE_KEY}-${key}`, data);
  }

  // Get cached API result
  private getLocalData(key) {
    return this.storage.get(`${API_STORAGE_KEY}-${key}`);
  }
}
