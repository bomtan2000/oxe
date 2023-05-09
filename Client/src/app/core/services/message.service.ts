import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { MessageDto } from '../models';
import { ApplicationHttpClient } from '../helper/base/http-client';
import { environment } from 'src/environments/environment';

@Injectable()
export class MessageService {

  private messageSource = new BehaviorSubject(new MessageDto('',''));
  currentMessage = this.messageSource.asObservable();

  constructor(private _http: ApplicationHttpClient,public http: HttpClient) { }

  changeMessage(message: MessageDto) {
   
    this.messageSource.next(message)
  }
  reset()
  {
    this.messageSource.next(new MessageDto() );
  }
  getNotifyMessage(employeeId: any,sourceType: any,messageType: any)
  {
      return this._http.GetAsync(environment.urlNotifyServer+`/api/GetMessage/${employeeId}/${sourceType}/${messageType}`) ;
  }
  updateStatusMessate(model:any)
  {
      return this._http.PostAsync(environment.urlNotifyServer+`/api/UpdateMsgStatus/MB_MPI`,model);
  }
}