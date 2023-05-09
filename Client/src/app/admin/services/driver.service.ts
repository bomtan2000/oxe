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
    this.subUri = "/tms/master";
  }

  search(model : any) {
    const endPoint = `${this.http._urlAPI}api/Drivers/GetAllDrivers`;
    return this.http.Post(endPoint, model);
        // return this.execAPI.postDataApi(endPoint, model);
  }

  searchById(id : number) {
    const endPoint = `${this.http._urlAPI}${this.subUri}/getstaff/${id}`;
    return this.http.Get(endPoint);
        // return this.execAPI.postDataApi(endPoint, model);
  }

  add(model: any) {
    const endPoint = `${this.http._urlAPI}api/Drivers/AddDriver`;
    return this.http.Put(endPoint, model);
  }

  update(model: any) {
    const endPoint = `${this.http._urlAPI}api/Drivers/UpdateDriver`;
    return this.http.Post(endPoint, model);
  }

  delete(driverId: string) {

    const insuranceData = {
      id : driverId
    }
    var reqHeader = new HttpHeaders({
                      "Content-Type": "application/json",
                    });
    const httpOptions = {
        headers: reqHeader,
        body: insuranceData,
    };

        
    const obj = {"id": driverId};
    const endPoint = `${this.http._urlAPI}api/Drivers/DeleteDriver`;
    return this.http.Delete(endPoint, httpOptions);
  }

}
