import { Injectable } from '@angular/core';
import { ApplicationHttpClient, ExecCallApi } from 'src/app/core/helper';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  subUri: string;
  constructor(
    private http: ApplicationHttpClient) 
  { 
    this.subUri = "gateway/clients";
  }

  search(model : any) {
    const endPoint = `${this.http._urlAPI}${this.subUri}/GetAllClient`;
    return this.http.Post(endPoint, model);
        // return this.execAPI.postDataApi(endPoint, model);
  }

  update(model: any) {
    const endPoint = `${this.http._urlAPI}${this.subUri}/updatecompany`;
    return this.http.Post(endPoint, model);
  }

  add(model: any) {
    const endPoint = `${this.http._urlAPI}${this.subUri}/AddClient`;
    return this.http.Post(endPoint, model);
  }

  delete(id: string) {
    const endPoint = `${this.http._urlAPI}${this.subUri}/company/${id}`;
    return this.http.Post(endPoint, "");
  }

  get(id: string) {
    const endPoint = `${this.http._urlAPI}${this.subUri}/getcompany/${id}`;
    return this.http.Get(endPoint);
  }

  getCountry() {
    const endPoint = `${this.http._urlAPI}${this.subUri}/getcountries`;
    return this.http.Get(endPoint);
  }

}
