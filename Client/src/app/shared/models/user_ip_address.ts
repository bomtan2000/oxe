export class UserIPAddress {
    ip: string;
    geoplugin_request: string;
    query: string;

    constructor(ip='', geoplugin_request='',query="") {
        this.ip = ip;
        this.geoplugin_request = geoplugin_request;
        this.query = query;
    }
}