import { Injectable } from '@angular/core';
import { ApplicationHttpClient } from 'src/app/core/helper';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  subUri: string;
  constructor(
    private http: ApplicationHttpClient,
  ) 
  { 
    this.subUri = "gateway/Menu";
  }
  search(model : any) {
    const endPoint = `${this.http._urlAPI}${this.subUri}/GetAllMenu?UserId=${model["userId"]}&SystemCode=${model["systemCode"]}`;
    return this.http.Post(endPoint, model);
        // return this.execAPI.postDataApi(endPoint, model);
  }
}
