import { Injectable } from '@angular/core';
import { ApplicationHttpClient, Globalconst } from 'src/app/core/helper';

@Injectable({
  providedIn: 'root'
})
export class IpaddressService {

  currentUser: any = {};
  subUri: string;
  
  
  constructor(
    private http: ApplicationHttpClient,
    ) 
  { 
    this.subUri = "gateway/Logging";
  }

  search(model : any) {
    const endPoint = `${this.http._urlAPI}${this.subUri}/GetAllActivity?UserId=${model["userId"]}`;
    return this.http.Post(endPoint, model);
        // return this.execAPI.postDataApi(endPoint, model);
  }
}
