import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { _const } from 'src/app/core/constants';
import { Globalconst } from 'src/app/core/helper';
import { MessageDto } from 'src/app/core/models';
import { AccountService } from 'src/app/core/services';
import { MessageService } from 'src/app/core/services/message.service';
// import { SignalRService } from 'src/app/core/services/signalR.service';
import { TitleHeaderPageService } from 'src/app/core/services/title-header-page.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  currentUser: any = {};
  messageList: MessageDto[] = [];
  titleHeader: string = '';
  constructor (
    private accService: AccountService, 
    private _messageService: MessageService,
    // public _signalRService: SignalRService,
    public globals: Globalconst,
    private appService: TitleHeaderPageService,
    private router: Router ) { }

  ngOnInit(): void {
    // this._signalRService.startConnection()
    this.currentUser = JSON.parse(localStorage.getItem('currentUser' ) || '{}') ;
    this._messageService.currentMessage.subscribe(message => {
      if (message.userName != '')
        this.messageList.push(message);
    });

    // Show Title Header
    this.appService.currentApprovalStageMessage.subscribe(msg => this.titleHeader = msg);

    this._messageService.getNotifyMessage(this.currentUser['employeeId'], "MB_MPI", _const.NOTIFICATIONS.title_default).then(data => {
      let result: any = data;
      result.forEach((element: { RequestUser: string | undefined; RequestTitle: string | undefined; ReqId: string | undefined; }) => {
        this.messageList.push(new MessageDto(element.RequestUser, element.RequestTitle, element.ReqId));
      });
    });
  }

  logout() {
    // this._signalRService.stopConnection();
    // this.messageList = [];
    // this._messageService.reset();
    this.accService.logout();
  }

  clearAll() {
    this.messageList = [];
  }

  markRead(item: MessageDto) {
    let index = this.messageList.indexOf(item);
    if (index != null) {
      this.messageList.splice(index, 1);
      this.updateStatus(item);
      this.router.navigate([item.link]);
    }
  }

  updateStatus(item: any) {
    let model = { "Username": this.globals._userinfo.employeeId, "ReqIds": item.id.toString(), "FinalStatusMessage": "READ" };
    this._messageService.updateStatusMessate(model);
  }

}
