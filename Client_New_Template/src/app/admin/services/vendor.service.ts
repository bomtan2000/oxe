import { Injectable } from '@angular/core';
import { ApplicationHttpClient, ExecCallApi } from 'src/app/core/helper';

@Injectable({
  providedIn: 'root'
})
export class VendorService {

  subUri: string;
  constructor(
    private http: ApplicationHttpClient) 
  { 
    this.subUri = "/tms/master";
  }

  search(model : any) {
    const endPoint = `${this.http._urlAPI}${this.subUri}/getcompanies`;
    return this.http.Post(endPoint, model);
        // return this.execAPI.postDataApi(endPoint, model);
  }

}
