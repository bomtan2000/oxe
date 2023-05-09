import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApplicationHttpClient, ExecCallApi } from 'src/app/core/helper';

@Injectable({
  providedIn: 'root'
})
export class DriverService {

  subUri: string;
  constructor(
    private http: ApplicationHttpClient) 
  { 
    this.subUri = "gateway/drivers";
  }

  search(model : any) {
    const endPoint = `${this.http._urlAPI}${this.subUri}/GetAllDrivers`;
    return this.http.Post(endPoint, model);
        // return this.execAPI.postDataApi(endPoint, model);
  }

  searchById(id : number) {
    const endPoint = `${this.http._urlAPI}${this.subUri}/getstaff/${id}`;
    return this.http.Get(endPoint);
        // return this.execAPI.postDataApi(endPoint, model);
  }

  add(model: any) {
    const endPoint = `${this.http._urlAPI}${this.subUri}/AddDriver`;
    return this.http.Post(endPoint, model);
  }

  update(model: any) {
    const endPoint = `${this.http._urlAPI}api/Drivers/UpdateDriver`;
    return this.http.Post(endPoint, model);
  }

  delete(id: string) {

    const insuranceData = {
      id : "1",
      updateBy : "thien.tran",
      updateDate : "2022-12-08T08:27:06.829Z"

    }
    const httpOptions = {
        body: insuranceData,
    };

    const endPoint = `${this.http._urlAPI}${this.subUri}/DeleteDriver`;
    return this.http.Post(endPoint, httpOptions);
  }
}
