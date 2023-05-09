import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApplicationHttpClient } from '../helper/base/http-client';
import { ExecCallApi } from '../helper/exec-call-api';
import { Helpers } from '../helper/helpers';
import { _const } from '../constants/constants';
import { Globalconst } from '../helper';
import * as moment from 'moment';


@Injectable()
export class CommonService {

    static StdCodeGetCombobox(): any {
        throw new Error('Method not implemented.');
    }

    private urlCommonAPI: string;

    constructor(private http: ApplicationHttpClient
        , private route: ActivatedRoute
        , private router: Router
        , private execCallApi: ExecCallApi
        , private _global: Globalconst
    ) {
        this.urlCommonAPI = 'commonservice';
    }

    getStdcodesByCode(id: string) {
        const _endPoint = `${this.urlCommonAPI}/stdcodes/${id}`;
        return this.execCallApi.getDataApi(_endPoint);
    }

    getLanguages() {
        const _endPoint = `${this.urlCommonAPI}/languages`;
        return this.execCallApi.getDataApi(_endPoint);
    }

    getApplications() {
        const _endPoint = `${this.urlCommonAPI}/applications`;
        return this.execCallApi.getDataApi(_endPoint);
    }

    /**
     * Get language resources
     * Method: GET
     * @param lang language
     */
    getResourcesByLang(lang: string = 'EN') {
        const _endPoint = `${this.urlCommonAPI}/resources/${lang}`;
        return this.execCallApi.getDataApi(_endPoint);
    }

    gallerys_save(model: any) {
        const _endPoint = `${this.urlCommonAPI}/gallerys_save`;
        return this.execCallApi.postDataApi(_endPoint, model);
    }

    gallerys_get(model: any) {
        const _endPoint = `${this.urlCommonAPI}/gallerys_get`;
        return this.execCallApi.postDataApi(_endPoint, model);
    }

    generateComment(model: any) {
        const _endPoint = `${this.urlCommonAPI}/generatecomment`;
        return this.execCallApi.postDataApi(_endPoint, model);
    }
    updateViewCount(model: any) {
        const _endPoint = `${this.urlCommonAPI}/likeview`;
        return this.execCallApi.postDataApi(_endPoint, model);
    }

    searchFacilities(subsidiaryId: string) {
        const _endPoint = `${this.http._urlAPI}/commonservice/facilities/subsidiaryid/${subsidiaryId}`;
        return this.http.Get(_endPoint);
    }

    getPendingRequest(subsidiaryId: string, userId: string) {
        const _endPoint = `${this.urlCommonAPI}/requestservice/pendding/${subsidiaryId}/${userId}`;
        return this.execCallApi.getDataApi(_endPoint);
    }

    /**
     * API get orgchart: OrgChartModule
     * @param subsidiaryId 
     */
    getOrgChart(subsidiaryId: any, empId: any) {
        const _endPoint = `/orgchartservice/orgchart/${subsidiaryId}/${empId}`;
        return this.execCallApi.getDataApi(_endPoint);
    }

    isAdmin(roleId: string) {
        let currentUser: any;

        if (!Helpers.isNullOrEmpty(roleId))
            currentUser = Helpers.getLocalStorage(_const.LOCAL_STORAGE.current_user);

        return (roleId && roleId == _const.APP_CONFIG.default_role_id)
            || (currentUser && currentUser.roleId == _const.APP_CONFIG.default_role_id);
    }

    urlback(url: string) {
        this.route.queryParams.subscribe(params => {
            this.router.navigate([url], { queryParams: params })
            params = [];
        });

    }

    urlnext(url: string, modelpara: any) {
        this.router.navigate([url], { queryParams: modelpara })
    }

    getDate(datestring: any) {
        var date = new Date(datestring),
            year = date.getFullYear(),
            month = (date.getMonth() + 1).toString(),
            formatedMonth = (month.length === 1) ? ('0' + month) : month,
            day = date.getDate().toString(),
            formatedDay = (day.length === 1) ? ('0' + day) : day,
            hour = (date.getHours() - 7).toString(),
            formatedHour = (hour.length === 1) ? ('0' + hour) : hour,
            minute = date.getMinutes().toString(),
            formatedMinute = (minute.length === 1) ? ('0' + minute) : minute,
            second = date.getSeconds().toString(),
            formatedSecond = (second.length === 1) ? ('0' + second) : second;
        return formatedDay + '-' + formatedMonth + '-' + year + ' ' + formatedHour + ':' + formatedMinute;
    };

    getpendingapproval(userId: any) {
        const _endPoint = `${this.urlCommonAPI}/pendingapproval/${userId}`;
        return this.execCallApi.getDataApi(_endPoint);
    }

    getcurrentdate(stringformat: string) {
        const today = new Date();
        const dd = today.getDate();
        const mm = today.getMonth() + 1; //January is 0!
        const yyyy = today.getFullYear();
        let rs = '';
        if (stringformat == 'YYYYMMDD') {
            rs = yyyy + '/' + mm + '/' + dd;
        }
        else if (stringformat == 'DDMMYYYY') {
            rs = dd + '/' + mm + '/' + yyyy;
        }
        return rs;
    }

    getGalleryByID(id: number) {
        const _endPoint = `${this.urlCommonAPI}/getgallerybyid/${id}`;
        return this.execCallApi.getDataApi(_endPoint);
    }

    geteContractType(type: string) {
        const _endPoint = `${this.urlCommonAPI}/getecontracttype/${type}`;
        return this.execCallApi.getDataApi(_endPoint);
    }

    getWorkLoc() {
        const _endPoint = `${this.urlCommonAPI}/getworkLocs`;
        return this.execCallApi.getDataApi(_endPoint);
    }

    convertMilisecondToUTCDateTime2(params: any, format = 'DD/MM/YYYY HH:mm') {
        if (this._global._systemOption && this._global._systemOption.datetimeformat) {
            format = this._global._systemOption.datetimeformat || 'DD/MM/YYYY HH:mm';
        }
        if (params && params != '' && params != ' ') {
            var tempDate = new Date(params);
            let dateTime = new Date(tempDate.getUTCFullYear(), tempDate.getUTCMonth(), tempDate.getUTCDate(), tempDate.getUTCHours(), tempDate.getUTCMinutes(), tempDate.getUTCSeconds());
            return moment(dateTime).format(format);
        }
        else {
            return params;
        }
    }

    convertMilisecondToUTCDate2(params: any, format = 'DD/MM/YYYY') {
        if (this._global._systemOption && this._global._systemOption.datetimeformat) {
            format = this._global._systemOption.datetimeformat.split(' ')[0];
        }
        if (params != null) {
            var tempDate = new Date(params);
            let dateTime = new Date(tempDate.getUTCFullYear(), tempDate.getUTCMonth(), tempDate.getUTCDate());
            return moment(dateTime).format(format);
        }
        else {
            return params;
        }
    }

    convertTime(localtime: any) {
        let format = 'HH:mm';
        if (this._global._systemOption?.datetimeformat) {
            format = this._global._systemOption.datetimeformat.split(' ')[1];
        }
        if (localtime == null) {
            return null;
        }
        localtime = localtime - 7 * 3600 * 1000;
        return moment(localtime).format(format);
    }

    // Convert time (HH:mm) in UTC to local time (TimeZone +7)
    convertRealTime(realtime: any, formatString: any) {
        formatString == null || formatString == '' ? formatString = 'HH:mm' : '';
        if (realtime == null) {
            return null;
        }

        return moment(realtime).zone(moment().zone()).format(formatString);
    }
}
