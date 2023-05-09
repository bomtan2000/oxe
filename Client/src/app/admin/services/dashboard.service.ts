
import { Injectable } from '@angular/core';
import { String } from 'typescript-string-operations';
import { ApplicationHttpClient } from 'src/app/core/helper';
import { ServiceName } from 'src/app/core/helper/base/service.name';
import { map } from 'rxjs/operators';

@Injectable()
export class DashboardService {
    urlAPI: string;
    constructor(
        private http: ApplicationHttpClient,

    ) {

        this.urlAPI = this.http._urlAPI + "/WP/WPRestFullSvc.svc";
    }
    Os_gettoday(subsidiary: string, contactCode: string, dcCode: string) {
        return this.http.Get(this.urlAPI + String.Format(ServiceName.Os_GetToday, subsidiary, contactCode, dcCode)).pipe(map((response: any) => response));
    }
    Ie_gettoday(subsidiary: string, contactCode: string, dcCode: string) {
        return this.http.Get(this.urlAPI + String.Format(ServiceName.IE_GetToday, subsidiary, contactCode, dcCode)).pipe(map((response: any) => response));
    }
    GetKPIScoreView(model: any) {
        return this.http.Post(this.urlAPI + ServiceName.GetKPIScoreView,model).pipe(map((response: any) => response));
    }
    GetKPIGroup(subsidiary: string, contactCode: string) {
        return this.http.Get(this.urlAPI + String.Format(ServiceName.GetKPIGroup, subsidiary, contactCode)).pipe(map((response: any) => response));
    }
    GetKPIYears() {
        let url=this.urlAPI + ServiceName.GetKPIYears;
        
        return this.http.Get(url).pipe(map((response: any) => response));
    }
    GetOnTimeOperationRawData(model:any) {
        return this.http.Post(this.urlAPI +ServiceName.GetOnTimeOperationRawData,model).pipe(map((response: any) => response));
    }
    GetKPIDashboard(subsiduaryId:string,contactCode:string,year:string,kpiGroup:string)
    {
        return this.http.Get(this.urlAPI + String.Format(ServiceName.GetKPIDashboard,subsiduaryId,contactCode,year,kpiGroup)).pipe(map((response:any)=>response));
    }
    
    GetKPIScoreViewDaily(model: any) {
        return this.http.Post(this.urlAPI + ServiceName.GetKPIScoreViewDaily,model).pipe(map((response: any) => response));
    }

    saveDashboardConfig(model: any) {
        return this.http.Post(this.urlAPI + ServiceName.SaveDashboardConfig,model).pipe(map((response: any) => response));
    }
    
    loadDashboardConfig(userId:string)
    {
       return this.http.Get(this.urlAPI +  String.Format(ServiceName.LoadDashboardConfig,userId)).pipe(map((response: any) => response));
    }
}