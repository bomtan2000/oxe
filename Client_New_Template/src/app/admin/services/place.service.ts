import { Injectable } from '@angular/core';
import { ApplicationHttpClient } from 'src/app/core/helper';

@Injectable({
  providedIn: 'root'
})
export class PlaceService {

  subUri: string;
  constructor(
    private http: ApplicationHttpClient
  ) { 
    this.subUri = "gateway/places";
  }
  search(model : any) {
    const endPoint = `${this.http._urlAPI}${this.subUri}/GetAllPlace`;
    return this.http.Post(endPoint, model);
        // return this.execAPI.postDataApi(endPoint, model);
  }
  add(model: any) {
    const endPoint = `${this.http._urlAPI}${this.subUri}/AddPlace`;
    return this.http.Post(endPoint, model);
  }
}
