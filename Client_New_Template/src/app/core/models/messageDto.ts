export class MessageDto {
    id:string;
    userId: string | undefined;
    userName:string;
    status: string;//create,update,remove,view,active,inactive
    link:string | undefined;
    title:string | undefined;
    content:string;
    type:string | undefined;//login,itrequest,servicerequest,leaverequest,leaveaproval,serviceapproval
    createdDate:Date;
    avartar:string | undefined;
    constructor(username='', message='',id="") {
        this.userName = username;
        this.content = message;
        this.status = 'true';
        this.createdDate = new Date();
        this.id = id;
    }
    
}
