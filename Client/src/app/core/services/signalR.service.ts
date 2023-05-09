import { Injectable } from '@angular/core';
import * as signalR from "@microsoft/signalr";

import { HubConnectionState } from '@microsoft/signalr';
import { environment } from 'src/environments/environment';
import { Globalconst } from '../helper/globalvariable';
import { MessageDto } from '../models';
import { MessageService } from './message.service';

@Injectable()
export class SignalRService {

  public data!: MessageDto[];
  private hubConnection!: signalR.HubConnection;
  private _userId!: string;
  private _employeeName!: string;
  constructor(private dataProvider: MessageService, private _global: Globalconst) {

  }
  public startConnection = () => {
    this._userId = this._global._userinfo.employeeId.toString();
    this._employeeName = this._global._userinfo.employeeName;

    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(environment.urlNotifyServer + '/notificationHub', {
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets
      }).build();
    this.hubConnection.start()
      .then(() => {
        this.hubConnection.invoke("SetUserInfo", this._userId, this._employeeName, "WB_MPI", "", "", this._global._avatar);
        this.receiveMessage();
      })
      .catch(err => console.log('Error while starting connection: ' + err))
  }
  public receiveMessage = () => {
    this.hubConnection.on("ReceiveMessage", (userName, message, type) => {
      let dto = JSON.parse(message);
      let messDto = Object.assign(new MessageDto(), dto);
      this.dataProvider.changeMessage(messDto);
    });
  }
  public sendMesageToAll(message: string) {
    this.hubConnection.invoke("SendMessage", this._employeeName, message).catch(function (err) {
      return console.error(err.toString());
    });
  }
  public sendMessageToUser(receiver: any, message: any) {
    this.hubConnection.invoke("SendMessageForSpecificClient", receiver, this._employeeName, JSON.stringify(message)).catch(function (err) {
      return console.error(err.toString());
    });
  }
  /**
   * name
   */
  public stopConnection() {
    if (this.hubConnection.state === HubConnectionState.Connected) {
      this.hubConnection.stop().then().catch(err => console.log(err.toString()));
    }
  }
}
