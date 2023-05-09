import { Injectable } from '@angular/core';
import { ApplicationHttpClient } from 'src/app/core/helper';

@Injectable({
  providedIn: 'root'
})
export class StdcodeService {

  subUri: string;
  constructor(
    private http: ApplicationHttpClient
  ) { 
    this.subUri = "gateway/stdcode";
  }
  search(model : any) {
    const endPoint = `${this.http._urlAPI}${this.subUri}/GetAllStdCodes`;
    return this.http.Post(endPoint, model);
        // return this.execAPI.postDataApi(endPoint, model);
  }
  add(model: any) {
    const endPoint = `${this.http._urlAPI}${this.subUri}/AddStdCode`;
    return this.http.Post(endPoint, model);
  }
}
